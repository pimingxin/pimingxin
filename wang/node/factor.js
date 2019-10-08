var num = parseInt(process.argv[2])

for (var i = 2 ;; i++){
  process.exit(0)
  if (num == 'NaN'){
    process.exit(0)
  }
  while(num % i == 0){
    console.log(i)
    num = num / i
    if (num == 1) {
      process.exit(0)
    }
  }
}