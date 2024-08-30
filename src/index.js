const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// Connect to database
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded());
app.use(express.json());

// XMLHttpRequest, fetch, axios,

// HTTP logger
app.use(morgan('combined'));

app.use(methodOverride('_method'));
app.use(SortMiddleware);

// Template engine
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    helpers:{
      sum: (a,b) => a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';
        
        const icons = {
          default: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/>
                    </svg>`,
          asc: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down-alt" viewBox="0 0 16 16">
                  <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5"/>
                </svg>`,
          desc: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down" viewBox="0 0 16 16">
                  <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/>
                </svg>`,
        }

        const types = {
          default: 'desc',
          desc: 'asc',
          asc: 'desc',
        }
        
        const icon = icons[sortType];
        const type = types[sort.type];

        return `<a href="?_sort&column=${field}&type=${type}">
          ${icon}
        </a>`;
      },  
    },
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

// Route init
route(app);

// 127.0.0.1 - localhost
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// nodemon
// morgan
