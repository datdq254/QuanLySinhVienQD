// Tao đối tượng chứa thông tin request về API từ BE (Lưu ý các thông tin phải chính xác với phía BE đưa về)
var objectAjax = {
    url: 'http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien',
    method: 'GET',
    responseType: 'JSON'
}

//Dùng thư viên Axios gọi về thông tin yêu cầu back end trả dữ liệu
var promise = axios(objectAjax);

promise.then(function(response) {
    var noiDungTable = '';
    console.log(response.data);
    for (i = 0; i < response.data.length; i++) {
        var sinhVien = response.data[i];
        noiDungTable += `
            <tr>
                <td>${sinhVien.MaSV}</td>
                <td>${sinhVien.HoTen}</td>
                <td>${sinhVien.Email}</td>
                <td>${sinhVien.SoDT}</td>
                <td>${sinhVien.CMND}</td>
                <td>${sinhVien.DiemToan}</td>
                <td>${sinhVien.DiemLy}</td>
                <td>${sinhVien.DiemHoa}</td>
                <td>
                    <button class = "btn btn-danger" onclick = "xoaSinhVien('${sinhVien.MaSV}')">Xoá</button>
                    <button class = "btn btn-success" onclick = "suaSinhVien('${sinhVien.MaSV}')">Sửa</button> 
                </td>
            </tr>
        `
    }
    document.querySelector('#tblSinhVien').innerHTML = noiDungTable;
}).catch(function(err) {
    console.log(err);
});

var suaSinhVien = function(maSV) {
    axios({
        url: `http://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/${maSV}`, //Đường dẫn đến back end
        method: 'GET'
    }).then(function(response) {
        console.log(response);
        var sinhVien = response.data;
        document.getElementById('MaSV').value = sinhVien.MaSV;
        document.getElementById('HoTen').value = sinhVien.HoTen;
        document.getElementById('Email').value = sinhVien.Email;
        document.getElementById('SoDT').value = sinhVien.SoDT;
        document.getElementById('DiemToan').value = sinhVien.DiemToan;
        document.getElementById('DiemLy').value = sinhVien.DiemLy;
        document.getElementById('DiemHoa').value = sinhVien.DiemHoa;

    }).catch(function(err) {
        console.log(err)
    });

}

var xoaSinhVien = function(MaSV) {
    var obAjaxXoaNhanVien = {
            url: `http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/${MaSV}`,
            method: 'DELETE'
        }
        //Gọi API Xoá NV
    axios(obAjaxXoaNhanVien).then(function(res) {
        console.log(res);
    }).catch(function(err) {
        console.log(err);
    });
    window.location.reload();
}


//-------------------------------Chức năng thêm sinh viên----------------------

document.getElementById('btnThemSinhVien').onclick = function() {
        var sv = new SinhVien();
        sv.MaSV = document.getElementById('MaSV').value;
        sv.HoTen = document.getElementById('HoTen').value;
        sv.Email = document.getElementById('Email').value;
        sv.SoDT = document.getElementById('SoDT').value;
        sv.DiemToan = document.getElementById('DiemToan').value;
        sv.DiemLy = document.getElementById('DiemLy').value;
        sv.DiemHoa = document.getElementById('DiemHoa').value;

        console.log(sv)
        var objectAjax = {
                url: 'http://svcy.myclass.vn/api/SinhVien/ThemSinhVien',
                method: 'POST',
                data: sv, //sv là dữ liệu ta lấy ra từ các ô input ta nhập vào và gửi về back end xử lý vì vậy cần phải ghi đúng chính xác tên các thuộc tính back end yêu cầu
            }
            //Dùng axios gửi dữ liệu về lại back end
        axios(objectAjax).then(function(res) {
            console.log(res);
        }).catch(function(err) {

        });

        //Gọi phương thức reload lại trang
        window.location.reload();
    }
    //---------------------------------------Chức năng sửa thông tin sinh viên------------
document.getElementById('btnCapNhatSinhVien').onclick = function() {
    //Lấy thông tin người dùng nhập vào
    var sv = new SinhVien();
    sv.MaSV = document.getElementById('MaSV').value;
    sv.HoTen = document.getElementById('HoTen').value;
    sv.Email = document.getElementById('Email').value;
    sv.SoDT = document.getElementById('SoDT').value;
    sv.DiemToan = document.getElementById('DiemToan').value;
    sv.DiemLy = document.getElementById('DiemLy').value;
    sv.DiemHoa = document.getElementById('DiemHoa').value;
    console.log(sv);
    //Gọi API để cập nhật dữ liệu BE cung cấp
    axios({
        url: 'http://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien',
        method: 'put',
        data: sv
    }).then(function(response) {
        console.log(response);
    }).catch(function(err) {
        console.log(err);
    });
}