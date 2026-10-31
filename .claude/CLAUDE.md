# CLAUDE.md — Intat's Hub (web-link-list)

## ภาษา

- **ตอบผู้ใช้เป็นภาษาไทยเสมอ** (รวมถึงสรุปงาน คำอธิบาย และคำถาม)
- ชื่อไฟล์ โค้ด คำสั่ง และ commit message ใช้ภาษาอังกฤษตามปกติ
- ข้อความ UI ในแอปเป็นภาษาอังกฤษ เว้นแต่ผู้ใช้สั่งให้เปลี่ยน

## ภาพรวมโปรเจกต์

เว็บรวมลิงก์เครื่องมือส่วนตัว ("hub") deploy บน GitHub Pages ที่ `https://intatlikit.github.io/web-link-list/`

- **Framework:** Vue 3 (`<script setup lang="ts">`, Composition API)
- **Build:** Vite 5 (`base: '/web-link-list/'`)
- **Language:** TypeScript strict, ตรวจด้วย `vue-tsc`
- **Data:** Supabase (`@supabase/supabase-js`) ตาราง `links`
- **Styling:** Vanilla CSS — `<style scoped>` ต่อ component + CSS variables (HSL) ใน `src/assets/main.css`
- **CI/CD:** GitHub Actions → GitHub Pages + แจ้งเตือนทางอีเมล

## โครงสร้างโค้ด

```
src/
├── main.ts                      # entry: createApp + global CSS
├── App.vue                      # ประกอบหน้า: เลือก state (loading/error/empty/grid)
├── assets/main.css              # theme tokens (CSS vars, dark/light) + .card-grid
├── lib/supabase.ts              # Supabase client (null ถ้าไม่มี env)
├── composables/
│   ├── useLinks.ts              # โหลดลิงก์จาก Supabase / fallback local
│   └── useLinkSearch.ts         # state ค้นหา + filteredLinks
├── components/
│   ├── layout/AppHeader.vue     # หัวเว็บ (title, subtitle, slot)
│   ├── layout/AppFooter.vue     # footer + version
│   ├── search/SearchBar.vue     # ช่องค้นหา (v-model)
│   ├── links/LinkGrid.vue       # grid ของการ์ด
│   ├── links/LinkCard.vue       # การ์ดลิงก์เดี่ยว
│   └── states/                  # LoadingState, ErrorState, EmptyState
├── data/links.ts                # ข้อมูลสำรอง (ใช้เมื่อไม่ได้ตั้งค่า Supabase)
└── types.ts                     # LinkItem, LinkRow
supabase/schema.sql              # สร้างตาราง + RLS + seed
```

## Supabase และ Secrets

- Client อ่านค่าจาก `VITE_SUPABASE_URL` และ `VITE_SUPABASE_ANON_KEY`
- ใน CI ค่าเหล่านี้มาจาก **GitHub repository secrets** `SUPABASE_URL` และ `SUPABASE_ANON_KEY` (ส่งเป็น env ในขั้น Build ของ `.github/workflows/deploy.yml`)
- Local dev: คัดลอก `.env.example` เป็น `.env.local` (ถูก gitignore) — ถ้าไม่ตั้งค่า แอปจะใช้ `src/data/links.ts` แทน
- anon key ถูก bundle ไปฝั่ง client เสมอ ความปลอดภัยจึงขึ้นกับ **RLS** — ห้ามใช้ `service_role` key ในฝั่ง frontend เด็ดขาด
- เปลี่ยน schema ตาราง → อัปเดต `supabase/schema.sql`, `LinkRow` ใน `types.ts` และ query ใน `useLinks.ts` ให้ตรงกัน

## แนวทางเขียนโค้ด

- Component ใหม่ใช้ `<script setup lang="ts">` + `defineProps<{...}>()` แบบ type-based, ใช้ `defineModel` สำหรับ v-model
- แยก component ตามหน้าที่ลงโฟลเดอร์ย่อยใน `src/components/` (layout / search / links / states) — component ทำหน้าที่แสดงผล, logic ดึงข้อมูลอยู่ใน `composables/`
- สีใช้ CSS variables จาก `main.css` เท่านั้น ไม่ hard-code สีใน component (light mode จัดการที่ `:root` ที่เดียว)
- ลิงก์ภายนอกต้องมี `target="_blank"` และ `rel="noopener noreferrer"`
- TS ใช้ single quote + semicolon, import type ด้วย `import type`

## คำสั่ง

- `npm run dev` — dev server ที่ `http://localhost:5173/web-link-list/`
- `npm run check` — **ต้องผ่านก่อน commit**: ESLint (`--max-warnings 0`) + `vue-tsc`
- `npm run build` — build ลง `./dist`
- `npm run preview:prod` — build แล้ว preview
- `npm run skill:build` — sync skill `git-conventional-commits` ไป `.gemini/` และแพ็ก `.skill`

## กฎสำคัญ

- Zero warnings: `npm run check` ต้องไม่มี error/warning
- ห้าม commit secrets หรือไฟล์ `.env*` (ยกเว้น `.env.example`)
- Commit message ตาม Conventional Commits (ดู `git-conventional-commits/SKILL.md`)
