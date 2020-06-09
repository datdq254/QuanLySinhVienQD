console.log(axios);

// Tạo ra đối tượng chứa 3 thuộc tính cần thiết để giao tiếp với back end thông qua thư viện axios
var objectAjax = {
    url: '../data/DanhSachNguoiDung.json', // Đường dẫn đến file chứa dữ liệu hoặc API Back End
    method: 'GET', // Giao thức back end cung cấp với url
    responseType: 'json'
}

var renderTable = function(res) {

    }
    //Axios là thư viện sử dụng đối tượng chứa 3 thuộc tính để gọi về back end lấy dữ liệu
    //Dùng thư viện axios để đọc file api từ back end
    //Khi ta gọi api từ back end lên đôi khi sẽ có việc chậm trễ dữ liệu hay ko thành công thư viện axios đc tạo ra đẻ giúp ta handle việc đó ta tạo ra 1 biến là promise để bắt sự kiện axios trả về vì axios trả về cho ta là kiểu promise then hoặc catch và từ đó ta mới lấy dữ liệu ra thông qua câu lệnh then và catch 
var promise = axios(objectAjax);

promise.then(function(response) {
    var noiDungTable = '';
    console.log(response.data);
    for (i = 0; i < response.data.length; i++) {
        var nguoiDung = response.data[i];
        noiDungTable += `
            <tr>
                <td>${nguoiDung.TaiKhoan}</td>
                <td>${nguoiDung.MatKhau}</td>
                <td>${nguoiDung.HoTen}</td>
                <td>${nguoiDung.Email}</td>
                <td>${nguoiDung.SoDT}</td>
            </tr>
        `
    }
    document.querySelector('#tblNguoiDung').innerHTML = noiDungTable;
}).catch(function(err) {
    console.log(err);
});