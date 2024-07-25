export const ConvertDate=(number)=>{
    const numb=new Date();
    const month=numb.getMonth();
    const date=numb.getDate();
    return date+'/'+(month+1);
}