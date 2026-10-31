# CLAUDE.md — Intat's Hub (web-link-list)

## ภาษา

- **ตอบผู้ใช้เป็นภาษาไทยเสมอ** (รวมถึงสรุปงาน คำอธิบาย และคำถาม)
- ชื่อไฟล์ โค้ด คำสั่ง และ commit message ใช้ภาษาอังกฤษตามปกติ
- ข้อความ UI ในแอปเป็นภาษาอังกฤษ เว้นแต่ผู้ใช้สั่งให้เปลี่ยน

## ภาพรวมโปรเจกต์

เว็บรวมลิงก์เครื่องมือส่วนตัว ("hub") deploy บน GitHub Pages ที่ `https://intatlikit.github.io/web-link-list/`
**ทุกคนเพิ่ม/แก้/ลากเรียงลำดับ item ได้โดยไม่ต้อง login** (ผู้ใช้ตัดสินใจเอง) ทุกเครื่องเห็นข้อมูลชุดเดียวกันจาก Supabase ลบได้ (soft delete + กล่องยืนยัน)

- **Framework:** Vue 3 (`<script setup lang="ts">`, Composition API) + Vue Router (hash history)
- **Build:** Vite 5 (`base: '/web-link-list/'`)
- **Language:** TypeScript strict, ตรวจด้วย `vue-tsc`
- **Data:** Supabase (`@supabase/supabase-js`) ตาราง `links` (ไม่ใช้ Supabase Auth)
- **Drag & drop:** `vue-draggable-plus` (SortableJS) ลากผ่าน handle — รองรับทั้ง mouse และ touch
- **Styling:** Vanilla CSS — `<style scoped>` ต่อ component + CSS variables (HSL) ใน `src/assets/main.css`
- **CI/CD:** GitHub Actions → GitHub Pages + แจ้งเตือนทางอีเมล

## โครงสร้างโค้ด

```
src/
├── main.ts                      # entry: createApp + router
├── App.vue                      # shell: <RouterView> + footer
├── router/index.ts              # routes (hash history)
├── views/                       # หน้าแต่ละ route (ประกอบ component, เรียก service)
│   ├── HomeView.vue             # รายการ + ค้นหา + drag & drop + FAB
│   ├── LinkCreateView.vue       # /links/new
│   └── LinkEditView.vue         # /links/:id/edit
├── components/
│   ├── layout/                  # AppHeader, AppFooter, PageHeader
│   ├── search/SearchBar.vue
│   ├── links/                   # LinkGrid (sortable), LinkCard, LinkForm
│   ├── states/                  # LoadingState, ErrorState, EmptyState
│   ├── common/                  # ClearableInput, SelectInput, BaseButton, ConfirmDialog, FloatingActionButton, AlertBanner
│   └── icons/                   # SVG icons (currentColor)
├── composables/                 # useLinks, useLinkSearch
├── services/
│   ├── linkService.ts           # create/update/reorder + คำนวณตำแหน่ง
│   └── linkBackends.ts          # Supabase backend / localStorage backend
├── lib/                         # supabase client, errors
├── assets/main.css              # theme tokens (CSS vars), .card-grid
├── data/links.ts                # seed สำหรับ local mode
└── types.ts                     # LinkItem, LinkInput, LinkRow
supabase/migrations/             # 001 ตาราง+RLS อ่าน+seed, 002 public insert/update + constraints + reorder_links(), 003 delete_link() soft delete
```

## Supabase และ Secrets

- Client อ่านค่าจาก `VITE_SUPABASE_URL` และ `VITE_SUPABASE_ANON_KEY`
- ใน CI ค่าเหล่านี้มาจาก **GitHub repository secrets** `SUPABASE_URL` และ `SUPABASE_ANON_KEY` (ส่งเป็น env ในขั้น Build ของ `.github/workflows/deploy.yml`)
- CI จะ fail ถ้าไม่มี secrets (กันเว็บจริงหลุดไปใช้ local mode)
- **Local mode:** ถ้าไม่มี env → ใช้ localStorage backend (dev เท่านั้น)
- RLS เปิด select/insert/update ให้ `anon` (column-level: แก้ได้แค่ title, url, description, sort_order)
- **การลบเป็น soft delete เท่านั้น** ผ่าน RPC `delete_link(link_id)` (ตั้ง `is_active = false`) กู้คืนได้ใน Table Editor — ห้ามเปลี่ยนเป็นลบจริง (DELETE) หรือเปิดให้ anon เขียน `is_active` ตรง ๆ โดยไม่ถามผู้ใช้
- เพราะใครก็เขียนได้ DB constraints คือด่านเดียวที่คุมข้อมูล: URL ต้องเป็น `http(s)://` (กัน `javascript:` XSS), จำกัดความยาว title/description — ฝั่งฟอร์มต้อง validate ให้ตรงกัน
- anon key ถูก bundle ไปฝั่ง client เสมอ — ห้ามใช้ `service_role` key ใน frontend เด็ดขาด
- ลำดับเก็บใน `sort_order`; เขียนลำดับใหม่ทั้งชุดผ่าน RPC `reorder_links(ordered_ids bigint[])`
- เปลี่ยน schema → เพิ่มไฟล์ migration ใหม่ใน `supabase/migrations/` (ห้ามแก้ไฟล์ที่รันไปแล้ว) และอัปเดต `LinkRow`, `linkBackends.ts` ให้ตรงกัน

## แนวทางเขียนโค้ด

- Component ใหม่ใช้ `<script setup lang="ts">` + `defineProps<{...}>()` แบบ type-based, ใช้ `defineModel` สำหรับ v-model
- แยกหน้าที่ชัดเจน: **views** ประกอบหน้า/จัดการ navigation, **components** แสดงผล (รับ props / emit event), **composables** เก็บ state, **services** ติดต่อข้อมูล
- Component ห้ามเรียก Supabase ตรง ๆ — ผ่าน `services/linkService.ts` เสมอ
- สีใช้ CSS variables จาก `main.css` เท่านั้น ไม่ hard-code สีใน component
- UI ต้องใช้ได้ทั้งมือถือและเดสก์ท็อป: touch target ≥ 36–44px, input font-size ≥ 16px, drag handle ต้องมี `touch-action: none`, ใช้ `clamp()`/`min()` แทนขนาดตายตัว และเช็คที่ความกว้าง 320px ว่าไม่ล้นแนวนอน

### กฎฟอร์ม (บังคับ)

- **ช่องกรอกข้อความทุกช่องต้องมีปุ่ม ✕ ล้างข้อความเสมอ** → ใช้ `components/common/ClearableInput.vue` (รองรับ `multiline` สำหรับ textarea และ `variant="pill"`) ห้ามใช้ `<input>` / `<textarea>` แบบข้อความตรง ๆ
  - ปุ่ม ✕ แสดงเมื่อช่องมีข้อความ, กดแล้วล้างค่าและ focus กลับที่ช่อง
  - ยกเว้นเฉพาะ input ที่ไม่ใช่ข้อความ (checkbox, radio, file ฯลฯ)
- **ฟอร์มเพิ่ม/แก้ item: ทุกช่องบังคับกรอก ห้ามว่าง** (Title, URL, Description) — ใส่ `required` และเช็คค่าหลัง `trim()` (กันกรอกแต่เว้นวรรค) ให้ตรงกับ constraint ใน DB
- **ปุ่มใช้ `components/common/BaseButton.vue`** (variant: primary / secondary / danger / danger-outline)
- **การกระทำที่ทำลายข้อมูล (เช่น ลบ) ต้องมีกล่องยืนยัน `ConfirmDialog` ก่อนเสมอ** — ห้ามใช้ `window.confirm`/`alert`
- **Dropdown ทุกตัวใช้ `components/common/SelectInput.vue`** (ลูกศร custom ตรงกลางแนวตั้ง, ข้อความยาวตัดเป็น …) ห้ามใช้ `<select>` เปล่า
- Dropdown ลำดับ: ตัวเลือก **"At the end"** อยู่บนสุด ไม่มีเลขลำดับ และเป็นค่าเริ่มต้นเมื่อเพิ่ม item ใหม่ (ตอนแก้ไขค่าเริ่มต้นคือตำแหน่งปัจจุบัน เพื่อไม่ให้ item ย้ายโดยไม่ตั้งใจ)
- ลิงก์ภายนอกต้องมี `target="_blank"` และ `rel="noopener noreferrer"`
- TS ใช้ single quote + semicolon, import type ด้วย `import type`

## คำสั่ง

- `npm run dev` — dev server ที่ `http://localhost:5173/web-link-list/`
- `npm run check` — **ต้องผ่านก่อน commit**: ESLint (`--max-warnings 0`) + `vue-tsc`
- `npm run build` — build ลง `./dist`
- `npm run preview:prod` — build แล้ว preview

## กฎสำคัญ

- Zero warnings: `npm run check` ต้องไม่มี error/warning
- ห้าม commit secrets หรือไฟล์ `.env*` (ยกเว้น `.env.example`)
- Commit message ตาม Conventional Commits — ใช้ skill `git-conventional-commits` ใน `.claude/skills/`
