const imageSongs = [['Regulamin zabijania', '4wjKpimWmxZEyt9yIApA1s'],
['Ey Znowu To Mam', '2NGZeTKHwb8DGPODdbrYVr'],
['Klubowa Suka', '25BaMxOBYkpnPy8IhTI7qk'],
['Fortaleza', '0xdiOugLx0Ex2RK4OCGN2J'],
['Patoreakcja', '6h15XoaiqaAxzxZa30YVOo'],
['Ale jazz!', '0IiNfOoR2hkB0FznzscP5T'],
['To Dopiero Poczatek', '0BnWKSYV9euXiFUh2Eh6OZ'],
['Bliźniaczki', '3Dy07p97LjFWvMMsEDFi7a'],
['Tsunami blond', '1imtj34uLF96IyU9HGsHXg'],
['hghgfd', '22HuMVfjWPYpjVyWTUZu0w'],
['Niebieski Bentley', '12gZVHFpNKhLsu9vycfU6b']
]

const textSongs = [
    ["Sad!", "3ee8Jmje8o58CHK66QrVC2"],
    ["Hurt", "3n3Ppam7vgaVa1iaRUc9Lp"],
    ["Numb", "7k6IzwMGpxnRghE7YosnXT"],
    ["Boulevard of Broken Dreams", "3ZffCQKLFLUvYM59XKLbVm"],
    ["Creep", "6b2oQwSGFkzsMtQruIWm2p"],
    ["Everybody Hurts", "4KcL0L9mJXqWLKqPYi5g1v"],
    ["The Sound of Silence", "0B6BeEUd6UwFlbsHMQKjob"],
    ["Someone Like You", "4kflIGfjdZJW4ot2ioixTB"],
    ["Fix You", "7LVHVU3tWfcxj5aiPFEW4Q"],
    ["Hallelujah", "7H7mJJK4b3B4V7B1RNI6FC"],
]

const uniqueSongs = Array.from(new Set<string>([
    ...imageSongs.map(song => song[1]),
    ...textSongs.map(song => song[1])
]))
console.log(uniqueSongs)
const topSongs = [...imageSongs, ...textSongs].filter(song => uniqueSongs.includes(song[1]))
console.log(topSongs)
