# Sprint 3 REQ-04 - Module rieng

Bo code nay CHI chua giao dien React cho yeu cau xac minh va duyet claim, khong chua Foundly Final.

## Files
- REQ04_ClaimModal.jsx: modal nhap bang chung bi mat, validate, POST /claims.
- REQ04_ClaimReview.jsx: danh sach yeu cau cua chu bai, duyet/tu choi, mo phong ban giao.
- REQ04.css: CSS responsive.

## Tich hop
1. Copy 3 file vao thu muc frontend cua nhom, import `./REQ04.css`.
2. Import REQ04_ClaimModal va REQ04_ClaimReview.
3. Tai trang chi tiet bai FOUND, chi hien nut 'Xin nhan do' cho nguoi da dang nhap khong phai chu bai. Khi bam nut, render `<REQ04_ClaimModal report={report} api={api} onClose={() => setOpen(false)} onSuccess={notify} />`.
4. Trong trang quan ly cua chu bai, render `<REQ04_ClaimReview api={api} notify={notify} onOpenRoom={openRoom} />`.
5. Ham `api` phai tu them tien to `/api` va gui cookie phien. `onOpenRoom` dieu huong den phong ban giao theo claim ID.

## Backend can co
- POST /api/claims voi `{foundReportId, evidence}`.
- GET /api/claims/inbox.
- PATCH /api/claims/{id}/review voi `{approve: true|false}`.
- Backend phai kiem tra quyen chu bai va giu bi mat bang chung. Sau khi duyet phai tao phong ban giao theo logic backend.

Module tach tu giao dien REQ-04 cua Foundly Final, khong phai ung dung doc lap. Chua build/test voi repo nhom. Endpoint Sprint 1 cua nhom chua co claims, can backend Sprint 3 truoc khi chay E2E.
