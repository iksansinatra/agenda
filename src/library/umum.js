// import Swal from 'sweetalert2'
// const Swal = require('sweetalert2')

const tglConvert = (tgl) => {
    var date = new Date(tgl);
    var getBulan = date.getMonth() + 1; var bulan = '';
    if (getBulan == '1') {bulan = 'Januari'} 
    else if(getBulan == '2') {bulan = 'Februari'}
    else if(getBulan == '3') {bulan = 'Maret'}
    else if(getBulan == '4') {bulan = 'April'}
    else if(getBulan == '5') {bulan = 'Mei'}
    else if(getBulan == '6') {bulan = 'Juni'}
    else if(getBulan == '7') {bulan = 'Juli'}
    else if(getBulan == '8') {bulan = 'Agustus'}
    else if(getBulan == '9') {bulan = 'September'}
    else if(getBulan == '10') {bulan = 'Oktober'}
    else if(getBulan == '11') {bulan = 'November'}
    else if(getBulan == '12') {bulan = 'Desember'}

    return date.getDate() + " " + bulan + " " + date.getFullYear();
}

const check_gelar_depan = (data) => {
    if (data == undefined || data == null || data == '') {
        return ''
    } else {
        return data+'. '
    }
}
const check_gelar_belakang = (data1) => {
    if (data1 == undefined || data1 == null || data1 == '') {
        return ''
    } else {
        return ', '+data1
    }
}

const namaLengkap = (gelardepan, nama, gelarBelakang) =>{
    return check_gelar_depan(gelardepan)+""+nama+""+check_gelar_belakang(gelarBelakang)
}



const confirmx = async (text)=>{
    return new Promise (resolve =>{
        Swal.fire({
            title: 'Apakah anda yakin?',
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
          }).then((result) => {
            if (result.isConfirmed) {
            //   Swal.fire(
            //     'Deleted!',
            //     'Your file has been deleted.',
            //     'success'
            //   )
              resolve('');
            } else{
                return false;
            }
          })
    })
}


// =================== PAGINASI =========================

const btn_prev = (page_first) =>{

}


const btn_next = (page_first, page_last) => {

}




const loopingDate = ()=>{
    var bulan = 2;
    var tahun = 2021;
    var daysInMonth = new Date(2021, bulan, 0).getDate();
    var start = new Date(bulan+"/01/"+tahun);
    var end = new Date(bulan+"/"+daysInMonth+"/"+tahun);

    console.log(daysInMonth)

    var loop = new Date(start);

    while(loop <= end){
    console.log(loop)

    var newDate = loop.setDate(loop.getDate() + 1);
    loop = new Date(newDate);
    }
}



const replaceStr = (data) =>{
    var res = data.toString().replace(/\/|-| |@/g,'_X_');
      return res
  }

const ArrToObj = (data) =>{
    var obj = data.reduce(function(acc, cur, i) {
      acc[replaceStr(cur.route)] = {
        readx : cur.readx,
        updatex : cur.updatex,
        deletex : cur.deletex,
        addx : cur.addx,
      };
      return acc;
    }, {});
  
    return obj
  }


 const jadwalAbsen = (data)=>{
    if (data == 1) {
        return "Senin - Jum'at"
    } else if(data == 2){
        return "Senin - Sabtu"
    } else if(data == 3){
        return "Hari Tertentu"
    } else {
        return "Hari Belum ditentukan"
    }
 } 
  


module.exports = {
    tglConvert : tglConvert,
    check_gelar_depan : check_gelar_depan,
    check_gelar_belakang : check_gelar_belakang,
    namaLengkap : namaLengkap,
    btn_prev : btn_prev,
    btn_next : btn_next,
    confirmx : confirmx,
    ArrToObj : ArrToObj,
    jadwalAbsen : jadwalAbsen
}