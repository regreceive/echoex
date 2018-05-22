const Canvas = require('canvas');

module.exports = function(config, callback){
  config.fileMode   = config.fileMode || 0;
  config.size       = config.size || 4;
  config.height     = config.height || 24;
  config.width      = config.width || config.height * config.size;
  config.color      = config.color || 'rgb(0,0,0)';
  config.background = config.background || 'rgb(255,255,255)';
  config.lineWidth  = config.lineWidth || 2;
  config.saveDir    = config.saveDir || __dirname;
  config.text       = config.text || ('' + Math.random()).substr(2, config.size);
  config.noise      = (config.noise !== false);
  config.noiseColor = config.noiseColor || config.color;
  config.complexity = config.complexity || 3;
  config.complexity = (config.complexity < 1 || config.complexity > 5) ? 3 : config.complexity;
  config.spacing = config.spacing || 2;
  config.spacing = (config.spacing < 1 || config.spacing > 3) ? 2 : config.spacing;

  const fontSize = 50;//Math.round(config.height * 0.3 + (15 - config.complexity * 3));
  const canvas = new Canvas(config.width, config.height);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = config.background;
  ctx.fillRect(0, 0, config.width, config.height);
  ctx.fillStyle = config.color;
  ctx.lineWidth = config.lineWidth;
  ctx.font = fontSize +'px sans';

  if (config.noise) {
    ctx.strokeStyle = config.noiseColor;
    const noiseHeight = config.height;
    for (let i = 0; i < 2; i++) {
      ctx.moveTo(20, Math.random() * noiseHeight);
      ctx.bezierCurveTo(80, Math.random() * noiseHeight, 160, Math.random() * noiseHeight, 230, Math.random() * noiseHeight);
      ctx.stroke();
    }
  }

  const modifier = config.complexity / 5;
  ctx.strokeStyle = config.color;
  for (let i = 0; i < config.text.length; i++) {
    ctx.setTransform(
        Math.random() * modifier + 1 + modifier/3, Math.random() * modifier + modifier/3,
        Math.random() * modifier + modifier/3, Math.random() * modifier + 1 + modifier/3 + 0.1,
        (config.height * i)/(4-config.spacing) + (config.height-fontSize)/3 + 10,
        config.height-(config.height-fontSize)/2
    );
    ctx.fillText(config.text.charAt(i), 0, 30);
  }

  if (1 === config.fileMode) {
    const fs = require('fs');
    const filename = new Date().getTime() + Math.floor(Math.random()*1000) +'.png';
    const out = fs.createWriteStream(config.saveDir  +"/"+ filename);
    const stream = canvas.pngStream();

    stream.on('data', function(chunk){
      out.write(chunk);
    });

    stream.on('end', function(){
      callback(config.text, filename);
    });
  }
  else if (2 === config.fileMode) {
    canvas.toBuffer(function(err, buf) {
      callback(config.text, buf);
    });
  }
  else {
    canvas.toDataURL('image/png', function(err, data){
      callback(config.text, data);
    });
  }

};