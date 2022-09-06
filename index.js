const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

/* Menumpulkan kunci-kunci objek */
const kumpulkanKunci = (data, terkumpul=[]) => {
	data.forEach( d => Object.keys(d).forEach( (dk, i) => !terkumpul.includes(dk) ? terkumpul.splice(i, 0, dk) : false ))
	return terkumpul
}

/* Membuat kepala tabel dengan kunci-kunci objek yang sudah terkumpul */
const buatKepalaTabel = (kunci, kepala={}) => {
	kunci.forEach( k => kepala[k] = k[0].toUpperCase() + k.slice(1) )
	return kepala
}

/* Menentukan isi tabel terpanjang setiap colom nya */
const tentukanIsiTabelTerpanjang = (kunci, data, max={}) => {
	kunci.forEach( k => {
		/* Menetapkan nilai awal maksimal */
		max[k] = 0

		data.forEach( (d, i) => {
			/* Menentukan isi tabel */
			const isiTabel = tentukanIsiTabel(k, d)

			max[k] = max[k] > isiTabel.toString().length ? max[k] : isiTabel.toString().length
		})
	})
	return max
}

/* Menentukan isi tabel apakah text biasa atau index bulan atau angka  */
const tentukanIsiTabel = (kunci, data, isiTabel=data[kunci] ?? '-') => {
	/* Jika index bulan, maka kembalikan nama bulan */
	if (kunci === 'month') isiTabel = months[parseInt(isiTabel) - 1] ?? isiTabel

	/* Jika angka, maka kembalikan angka yang sudah disekat */
	if (kunci !== 'year' && parseInt(isiTabel)) isiTabel = sekatAngka(isiTabel)
	return isiTabel
}

/* Menyekat angka setiap 3 karakter dari sebelah kanan */
const sekatAngka = (angka, disekat='') => {
	angka.toString().split('').reverse().forEach( (aa, i) => disekat += i % 3 === 0 && i !== 0 ? '.' + aa : aa )
	return disekat.split('').reverse().join('')
}

/* Meratakan isi tabel termasuk kepala tabel setiap colom nya dengan memberi spasi */
const ratakanIsiTabel = (kunci, data, max, setting, diratakan=[]) => {
	data.forEach( d => {
		const isiTabelBerspasi = {}
		kunci.forEach( k => {
			/* Menentukan isi tabel */
			const isiTabel = tentukanIsiTabel(k, d)

			/* Menambahkan spasi */
			let spasi = ''
			for ( let x = 0; x < max[k] - isiTabel.toString().length; x++ ) spasi += ' '
			let spasiSetengah = spasi.slice(Math.floor(spasi.length/2))

			/* Menentukan alignment isi tabel apakah rata kiri atau tengah atau kanan */
			isiTabelBerspasi[k]
			= setting.kanan.includes(k)
			? spasi + isiTabel
			: setting.tengah.includes(k) || isiTabel === '-'
			? (spasiSetengah + isiTabel + spasiSetengah).length > max[k] ? spasiSetengah + isiTabel + spasiSetengah.slice(1) : spasiSetengah + isiTabel + spasiSetengah
			: isiTabel + spasi
		})
		diratakan.push(isiTabelBerspasi)
	})
	return diratakan
}

/* Membuat garis horizontal selebar tabel */
const buatGaris = (baris, garis='') => {
	for ( let x = 0; x < baris.length - 1; x++ ) garis += '-'
	return garis + '\n'
}

/* Membentuk colom tabel dengan memberi sekat setiap colom nya */
const bentukTabel = (kunci, data, setting, text='') => {
	data.forEach( (itr, x) => {
		/* Membentuk tabel baris demi baris */
		let baris = ''
		kunci.forEach( (k, i) => baris += i === 0 ? '| ' + itr[k] : ' | ' + itr[k] )
		baris += ' |\n'

		/* Menentukan letak garis yaitu di atas kepala, dibawah kepala, di di akhir body */
		text
		+= x === 0 /* Atas dan bawah kepala */
		? buatGaris(baris) + baris + buatGaris(baris)
		: x === data.length - 1 /* Akhir body */
		? baris + buatGaris(baris)
		: baris /* body */
	})
	return text
}

/* Menyusun tabel */
const susunTabel = (data, setting) => {
	/* Mengumpulkan kunci-kunci objek */
	const kunci                      = kumpulkanKunci(data)
	/* Membuat kepala tabel */
	const kepalaTabel                = buatKepalaTabel(kunci)
	/* Menambahkan kepala tabel ke data */
	data.splice(0, 0, kepalaTabel) /*= Menambahkan kepala tabel sebagai data */
	/* Menentukan isi tabel terpanjang per colom */
	const isiTabelTerpanjangPerColom = tentukanIsiTabelTerpanjang(kunci, data)
	/* Meratakan isi tabel dengan spasi per colom */
	const isiTabelDiratakanPerColom  = ratakanIsiTabel(kunci, data, isiTabelTerpanjangPerColom, setting)
	/* Mengembalikan tabel yang sudah terbentuk */
	return bentukTabel(kunci, isiTabelDiratakanPerColom)
}

module.exports = susunTabel

// /* Data percobaan */
// const data = [
// 	{ lable : 'lorem ipsum', price : 1230985, date : 10, month : 2 },
// 	{ lable : 'dolor sit', price : 654879, date : 31, month : 3, year : 2022 },
// 	{ lable : 'amet consectetur', price : 36859741, date : 23, description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', month : 4 },
// 	{ lable : 'adipiscing elit', price : 458799876, date : 11, month : 8 }
// ]

// console.log(susunTabel(data, {
// 	/* Default = kiri : [semua colom], */
// 	kanan : ['price'], /* Meratakan isi tabel ke kanan */
// 	tengah : ['date'] /* Meratakan isi tabel ke tengah */
// }))
