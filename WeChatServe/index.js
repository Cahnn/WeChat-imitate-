const Koa = require('koa2');

const cors = require('koa2-cors');

const User = require('./db/User')
const Published = require('./db/Published')
const Retroaction = require('./db/Retroaction')

// 创建一个Koa对象表示web app本身:
const app = new Koa();
// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
// add router middleware:

const koaBody = require('koa-body');
const fs = require('fs');
const path = require('path');

app.use(cors());

app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
    }
}));

const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
app.use(router.routes());

const staticFiles = require('koa-static')
app.use(staticFiles(path.join(__dirname + '/public/')))


// add url-route:     ok
router.get('/findAllUser', async(ctx, next) => {
    let users = await User.findAll();
    ctx.body = users
});

// ok
router.post('/addFri', async(ctx, next) => {
    const jane = await User.create(ctx.request.body);
    // console.log("Jane's auto-generated ID:", jane.id);
    ctx.body = jane
});

// ok
router.post('/uploadfile', async(ctx, next) => {
    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, 'public/upload/') + `${file.name}`;
    console.log(filePath)
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return ctx.body = `http://localhost:3000/upload/${file.name}`;
});

router.post('/uploadfiles', async(ctx, next) => {
    // 上传单个文件
    const files = ctx.request.files; // 获取上传文件
    console.log("file", files)

    let filess = []
    for (const key in files) {
        let file = files[key]
        // 创建可读流
        const reader = fs.createReadStream(file.path);
        let filePath = path.join(__dirname, 'public/upload/') + `${file.name}`;
        console.log(filePath)
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);

        filess.push(`http://localhost:3000/upload/${file.name}`)
    }
    return ctx.body = filess;
});
//
router.post('/published', async(ctx, next) => {
    // console.log("ctx.request.body", ctx.request.body)
    ctx.request.body.imageList = JSON.stringify(ctx.request.body.imageList)
    const published = await Published.create(ctx.request.body);
    // console.log("published's auto-generated ID:", published.id);
    ctx.body = published
});

// ok
router.get('/findAllPublish', async(ctx, next) => {
    console.log("Published", Published)
    let publisheds = await Published.findAll();
    // console.log("publisheds", publisheds)
    // let obj = JSON.parse(publisheds)
    ctx.body = publisheds
});

// 已完成
router.post('/retroaction', async(ctx, next) => {
    const jane = await Retroaction.create(ctx.request.body);
    console.log("Jane's auto-generated ID:", jane.id);
    ctx.body = jane
});

app.listen(3000, () => {
    console.log('http://localhost:3000')
})
