# CLAUDE.md — Intat's Hub (web-link-list)

## ภาษา

- **ตอบผู้ใช้เป็นภาษาไทยเสมอ** (รวมถึงสรุปงาน คำอธิบาย และคำถาม)
- ชื่อไฟล์ โค้ด คำสั่ง และ commit message ใช้ภาษาอังกฤษตามปกติ
- ข้อความ UI ในแอปเป็นภาษาอังกฤษ เว้นแต่ผู้ใช้สั่งให้เปลี่ยน

## ภาพรวมโปรเจกต์

เว็บรวมลิงก์เครื่องมือส่วนตัว ("hub") deploy บน GitHub Pages ที่ `https://intatlikit.github.io/web-link-list/`
ผู้ใช้ที่ login แล้วเพิ่ม/แก้/ลากเรียงลำดับ item ได้ ผู้เข้าชมทั่วไปเห็นแบบอ่านอย่างเดียว

- **Framework:** Vue 3 (`<script setup lang="ts">`, Composition API) + Vue Router (hash history)
- **Build:** Vite 5 (`base: '/web-link-list/'`)
- **Language:** TypeScript strict, ตรวจด้วย `vue-tsc`
- **Data/Auth:** Supabase (`@supabase/supabase-js`) ตาราง `links` + Supabase Auth (email/password)
- **Drag & drop:** `vue-draggable-plus` (SortableJS) ลากผ่าน handle — รองรับทั้ง mouse และ touch
- **Styling:** Vanilla CSS — `<style scoped>` ต่อ component + CSS variables (HSL) ใน `src/assets/main.css`
- **CI/CD:** GitHub Actions → GitHub Pages + แจ้งเตือนทางอีเมล

## โครงสร้างโค้ด

```
src/
├── main.ts                      # entry: createApp + router + initAuth
├── App.vue                      # shell: <RouterView> + footer
├── router/index.ts              # routes + guard (meta.requiresAuth)
├── views/                       # หน้าแต่ละ route (ประกอบ component, เรียก service)
│   ├── HomeView.vue             # รายการ + ค้นหา + drag & drop + FAB
│   ├── LinkCreateView.vue       # /links/new
│   ├── LinkEditView.vue         # /links/:id/edit
│   └── LoginView.vue            # /login
├── components/
│   ├── layout/                  # AppHeader, AppFooter, PageHeader
│   ├── search/SearchBar.vue
│   ├── links/                   # LinkGrid (sortable), LinkCard, LinkForm
│   ├── states/                  # LoadingState, ErrorState, EmptyState
│   ├── common/                  # FloatingActionButton, AlertBanner
│   ├── auth/                    # LoginForm, AuthStatus
│   └── icons/                   # SVG icons (currentColor)
├── composables/                 # useLinks, useLinkSearch, useAuth
├── services/
│   ├── linkService.ts           # create/update/reorder + คำนวณตำแหน่ง
│   └── linkBackends.ts          # Supabase backend / localStorage backend
├── lib/                         # supabase client, errors
├── assets/                      # main.css (theme tokens, .card-grid), form.css
├── data/links.ts                # seed สำหรับ local mode
└── types.ts                     # LinkItem, LinkInput, LinkRow
supabase/migrations/             # 001 ตาราง+RLS อ่าน+seed, 002 สิทธิ์เขียน+reorder_links()
```

## Supabase, Auth และ Secrets

- Client อ่านค่าจาก `VITE_SUPABASE_URL` และ `VITE_SUPABASE_ANON_KEY`
- ใน CI ค่าเหล่านี้มาจาก **GitHub repository secrets** `SUPABASE_URL` และ `SUPABASE_ANON_KEY` (ส่งเป็น env ในขั้น Build ของ `.github/workflows/deploy.yml`)
- **Local mode:** ถ้าไม่มี env → ใช้ localStorage backend, แก้ไขได้โดยไม่ต้อง login (`canEdit` = true)
- **Supabase mode:** ต้อง login ถึงจะแก้ได้; RLS อนุญาต insert/update ให้ `authenticated` — ต้องปิด public sign-up ใน Supabase
- anon key ถูก bundle ไปฝั่ง client เสมอ ความปลอดภัยขึ้นกับ **RLS** — ห้ามใช้ `service_role` key ใน frontend เด็ดขาด
- ลำดับเก็บใน `sort_order`; เขียนลำดับใหม่ทั้งชุดผ่าน RPC `reorder_links(ordered_ids bigint[])`
- เปลี่ยน schema → เพิ่มไฟล์ migration ใหม่ใน `supabase/migrations/` (ห้ามแก้ไฟล์ที่รันไปแล้ว) และอัปเดต `LinkRow`, `linkBackends.ts` ให้ตรงกัน

## แนวทางเขียนโค้ด

- Component ใหม่ใช้ `<script setup lang="ts">` + `defineProps<{...}>()` แบบ type-based, ใช้ `defineModel` สำหรับ v-model
- แยกหน้าที่ชัดเจน: **views** ประกอบหน้า/จัดการ navigation, **components** แสดงผล (รับ props / emit event), **composables** เก็บ state, **services** ติดต่อข้อมูล
- Component ห้ามเรียก Supabase ตรง ๆ — ผ่าน `services/linkService.ts` เสมอ
- สีใช้ CSS variables จาก `main.css` เท่านั้น ไม่ hard-code สีใน component
- UI ต้องใช้ได้ทั้งมือถือและเดสก์ท็อป: touch target ≥ 40px, input font-size ≥ 16px, drag handle ต้องมี `touch-action: none`
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
