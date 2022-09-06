export const tanggalIndonesia = (tanggalan) => {
  if (tanggalan === null) return ''
  tanggalan = new Date(tanggalan)
  var tahun = tanggalan.getFullYear()
  var bulan = tanggalan.getMonth()
  var tanggal = tanggalan.getDate()
  var hari = tanggalan.getDay()
  var jam = tanggalan.getHours()
  var menit = tanggalan.getMinutes()
  var detik = tanggalan.getSeconds()
  switch (hari) {
    case 0:
      hari = 'Minggu'
      break
    case 1:
      hari = 'Senin'
      break
    case 2:
      hari = 'Selasa'
      break
    case 3:
      hari = 'Rabu'
      break
    case 4:
      hari = 'Kamis'
      break
    case 5:
      hari = "Jum'at"
      break
    case 6:
      hari = 'Sabtu'
      break
  }
  switch (bulan) {
    case 0:
      bulan = 'Januari'
      break
    case 1:
      bulan = 'Februari'
      break
    case 2:
      bulan = 'Maret'
      break
    case 3:
      bulan = 'April'
      break
    case 4:
      bulan = 'Mei'
      break
    case 5:
      bulan = 'Juni'
      break
    case 6:
      bulan = 'Juli'
      break
    case 7:
      bulan = 'Agustus'
      break
    case 8:
      bulan = 'September'
      break
    case 9:
      bulan = 'Oktober'
      break
    case 10:
      bulan = 'November'
      break
    case 11:
      bulan = 'Desember'
      break
  }
  var tampilTanggal = `${hari}, ${tanggal} ${bulan} ${tahun}, ${jam}:${menit}`

  return tampilTanggal
}
