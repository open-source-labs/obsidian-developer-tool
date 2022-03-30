// helper function to format linear string output into nice looking one
export const formatter = (data, spaces=0) =>{
  let str = '';
  if(Array.isArray(data)){
    str += '[\n';
    spaces++;
    for( let i = 0; i < data.length; i++){
      str += ' '.repeat(spaces) + formatter(data[i],spaces + 1);
    }
    str += ' '.repeat(spaces) + ']\n';
  }
  else if(typeof data === 'object'){
    str += '{\n';
    spaces++;
    for(const key in data){
      str += ' '.repeat(spaces) + key + ' : ';
      str += formatter(data[key], spaces + 1);
    }
    str += ' '.repeat(spaces) + '}\n';
  } else {
    str +=  data + '\n';
  }
  return str;
}