export function debounce(func:Function,wait:number,immediate:boolean=false,...args:Array<any>){
    let timer:number | null
    return function(this:any){
      if (timer) clearTimeout(timer)
      if (immediate) {
        func(...args)
        timer = setTimeout(() => {
        },wait)
      } else {
        timer = setTimeout(() => {
          func.apply(this,...args)
        }, wait)
      }
    }
  }

export function throttle(func:Function,wait:number,immediate:boolean=false,...args:Array<any>){
  let timer: number | null = null
  return function(this:any){
    if (immediate) {
      if (!timer) {
        func(...args)
        timer = setTimeout(() => {
          timer = null
        }, wait)
        console.log(timer)
      }
    } else {
      if (!timer) {
        timer = setTimeout(() => {
          func.apply(this,...args)
          timer = null
        }, wait)
      }
    }
  }
}  
  