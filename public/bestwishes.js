function bestwishes() {
  let strings = function() {
    /*
     ________ ___  ___  _________  ___  ___  ________  _______      
    |\  _____\\  \|\  \|\___   ___\\  \|\  \|\   __  \|\  ___ \     
    \ \  \__/\ \  \\\  \|___ \  \_\ \  \\\  \ \  \|\  \ \   __/|    
     \ \   __\\ \  \\\  \   \ \  \ \ \  \\\  \ \   _  _\ \  \_|/__  
      \ \  \_| \ \  \\\  \   \ \  \ \ \  \\\  \ \  \\  \\ \  \_|\ \ 
       \ \__\   \ \_______\   \ \__\ \ \_______\ \__\\ _\\ \_______\
        \|__|    \|_______|    \|__|  \|_______|\|__|\|__|\|_______|*/
  };
  let l = new String(strings);
  l = l.substring(l.indexOf('/*') + 3, l.lastIndexOf('*/'));
  console.log('%c'+l+'\n\n\n\t%c毕业快乐啊\n','font-weight:bold;color:#409EFF','font-weight:bold;font-size:1.6em;color:#7B68EE');
}
bestwishes();
