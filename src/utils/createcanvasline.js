function createcanvasline() {
  let canvas = document.getElementById("line");
      canvas.width = document.documentElement.clientWidth;
      canvas.height = document.documentElement.clientHeight;
      let ctx = canvas.getContext("2d");
      let LineArr = [];
      var mouse = {
        x: 0,
        y: 0,
      };
      window.onmousemove = function (i) {
        i = i || window.event;
        mouse.x = i.clientX;
        mouse.y = i.clientY;
      };
      //鼠标移出窗口后，消除鼠标
      window.onmouseout = function () {
        mouse.x = 0;
        mouse.y = 0;
      };
      function Line() {
        // 随机位置
        this.x = parseInt(Math.random() * canvas.width) - 1;
        this.y = parseInt(Math.random() * canvas.height) - 1;
        this.r = 0.8;
        this.color =
          "rgb(" +
          parseInt(Math.random() * 255) +
          "," +
          parseInt(Math.random() * 255) +
          "," +
          parseInt(Math.random() * 255) +
          ")";
        // x上前进距离
        this.dx = parseInt(Math.random() * 3) - 1.5;
        // y上前进距离
        this.dy = parseInt(Math.random() * 3) - 1.5;
        LineArr.push(this);
        this.index = LineArr.length - 1;
      }
      Line.prototype.update = function () {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x < 0.5 || this.x > canvas.width - this.r) {
          this.dx = -this.dx;
        }
        if (this.y < 0.5 || this.y > canvas.height - this.r) {
          this.dy = -this.dy;
        }
      };
      Line.prototype.render = function () {
        ctx.beginPath();
        ctx.globalAlpha = 1; //透明度
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();

        //画线
        for (let i = this.index; i < LineArr.length; i++) {
          if (
            Math.abs(LineArr[i].x - this.x) < 80 &&
            Math.abs(LineArr[i].y - this.y) < 80
          ) {
            ctx.strokeStyle = this.color; //"rgb(192,192,192)";
            ctx.beginPath();
            ctx.globalAlpha =
              12 /
              Math.sqrt(
                Math.pow(LineArr[i].x - this.x, 2) +
                  Math.pow(LineArr[i].y - this.y, 2)
              );
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(LineArr[i].x, LineArr[i].y);
            ctx.closePath();
            ctx.stroke();
          }
        }
        if (mouse.x > 2 && mouse.y > 2) {
          for (let i = this.index; i < LineArr.length; i++) {
            if (
              Math.abs(mouse.x - this.x) < 90 &&
              Math.abs(mouse.y - this.y) < 90
            ) {
              ctx.strokeStyle = this.color; //"rgb(192,192,192)";
              ctx.beginPath();
              ctx.globalAlpha =
                42 /
                Math.sqrt(
                  Math.pow(LineArr[i].x - this.x, 2) +
                    Math.pow(LineArr[i].y - this.y, 2)
                );
              ctx.moveTo(this.x, this.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.closePath();
              ctx.stroke();
            }
          }
        }
      };
      for (let i = 0; i < 128; i++) {
        new Line();
      }
      setInterval(() => {
        //清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < LineArr.length; i++) {
          LineArr[i].update();
          LineArr[i].render();
        }
      }, 20);
}
export {
  createcanvasline
}