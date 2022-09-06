# susun-tabel

## Penggunaan

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
const tabelTersusun = susunTabel(data, { /* parameter kedua ini opsional */
	/* Default = kiri : [semua colom], */
	kanan : ['price'], /* Meratakan isi tabel ke kanan */
	tengah : ['date'] /* Meratakan isi tabel ke tengah */
})
console.log(tabelTersusun)
```

Dan ini hasil nya

```
-----------------------------------------------------------------------------------------------------------------------
| Lable            |       Price | Date | Description                                              | Month     | Year |
-----------------------------------------------------------------------------------------------------------------------
| lorem ipsum      |   1.230.985 |  10  |                             -                            | Maret     |   -  |
| dolor sit        |     654.879 |  31  |                             -                            | April     | 2022 |
| amet consectetur |  36.859.741 |  23  | Lorem ipsum dolor sit amet consectetur adipisicing elit. | Mei       |   -  |
| adipiscing elit  | 458.799.876 |  11  |                             -                            | September |   -  |
-----------------------------------------------------------------------------------------------------------------------
```

# Terimakasih udah mampir kemari :)
