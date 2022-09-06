# susun-tabel

#Penggunaan

Misalkan kita punya data gini :

```Javascript
/* Data percobaan */
const data = [
	{ lable : 'lorem ipsum', price : 1230985, date : 10, month : 2 },
	{ lable : 'dolor sit', price : 654879, date : 31, month : 3, year : 2022 },
	{ lable : 'amet consectetur', price : 36859741, date : 23, description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', month : 4 },
	{ lable : 'adipiscing elit', price : 458799876, date : 11, month : 8 }
]
```

Kita bisa membuat data tersebut menjadi tabel dengan format text dengan cara berikut

```Javascript
console.log(susunTabel(data, { /* parameter kedua ini opsional */
	/* Default = kiri : [semua colom], */
	kanan : ['price'], /* Meratakan isi tabel ke kanan */
	tengah : ['date'] /* Meratakan isi tabel ke tengah */
}))
```

# Terimakasih udah mampir kemari :)
