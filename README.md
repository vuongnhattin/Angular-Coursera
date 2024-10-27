# Coursera Clone Project - Frontend
## Giới thiệu 
Dự án fullstack tạo nên một website học tập tương tự như Coursera. Project dùng Java Spring Boot cho backend và Angular cho frontend (repository của Spring Boot: https://github.com/vuongnhattin/Spring-Coursera). 
## Chức năng
### 1. Video demo
Comming soon...
### 2. Các chức năng
- Đăng kí (có xác thực email), đăng nhập bằng tài khoản Google hoặc Github có sẵn.
- Người dùng có thể thay đổi thông tin tài khoản.
- Các chức năng xem, thêm, sửa, xoá dành cho khoá học (chỉ các quản trị viên của khoá học mới có quyền xoá, sửa).
- Tìm kiếm khoá học dựa theo tên hoặc description.
- Quản trị viên của một khoá học có thể tìm kiếm và thêm user khác làm quản trị viên cho khoá học đó, có thể chỉnh sửa thông tin khoá học hoặc xoá khoá học.
- Người dùng có thể xem video, đọc file pdf và download về máy. Quản trị viên có thể upload, xoá video hoặc file pdf cho một học phần.
- Những người dùng trong một khoá học có thể chat nhóm với nhau theo thời gian thực
### 2. Công nghệ
- Angular phiên bản 18.
- UI sử dụng thư viện NG Bootstrap để trang trí.
- Dùng Stomp và SockJS để tạo Socket.
- Dùng thư viện angular-oauth2-oidc để thao tác với server Keycloak.
- Dùng Subject của thư viện rxjs để thực hiện các giao tiếp phức tạp giữa các component.
