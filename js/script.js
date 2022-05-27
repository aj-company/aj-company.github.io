"use strict"; const init = () => {
  const
    head = document.querySelector('head'),
    header = document.querySelector("header#main"),
    body = document.querySelector("content#body"),
    footer = document.querySelector("footer#main");
  (() => {const // default styles
      styles = {
        root: `
          --d0: #000;
          --d1: #333;
          --d2: #555;
          --d: var(--d1);

          --l0: #fff;
          --l1: #ccc;
          --l2: #aaa;
          --l: var(--l1);
          
          --green1: #afa;
          --green2: #0f0;
          --green3: #040;
          --green4: #020;

          --cl-d: var(--d);
          --cl-l: var(--l);
          --cl-1: var(--green1);
          --cl-2: var(--green2);
          --cl-3: var(--green3);
          --cl-4: var(--green4);

          margin: 0;
          padding: 0;
          top: 0;
          left: 0;
          box-sizing: boder-box:
          animation: .4s all ease-in-out;
          overflow: hidden;
        `,
        all: `
          color: var(--cl-1);
        `,
        a: `
          text-decoration: none;
        `,
        body: `
          position: relative;
          margin:0;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: var(--cl-4);
        `,
        'header#main': `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          background: rgb(0,55,0);
          box-shadow: 0 10px 30px 45px rgb(0,55,0);
          padding-top: 35px;
          margin: auto;
          z-index: 1000;
        `,
        'header#main .navbar ul': `
          display: flex;
        `,
        'header#main .navbar ul li': `
          margin: 0 5px;
          list-style: none;
        `,
        'header#main .active, footer#main .active': `
          color: var(--cl-l);
        `,
        'header#main .active:before, footer#main .active:before': `
          content: '.',
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          color: transparent;
          transition:
            width .4s ease-in-out,
            color .2s ease-in-out;
        `,
        'header#main .active:hover, footer#main .active:hover': `
          color: var(--cl-2);
        `,
        'header#main .active:before:hover, footer#main .active:hover:before': `
          width: 100%;
          color: var(--cl-2);
        `,
        'content#body': `
          position: absolute;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100%;
        `,
        'content#body .home': `
          position: absolute;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100%;
        `,
        'content#body .home img': `
          position: absolute;
          height: auto;
          width: 100vw;
          left: 0;
          right: 0;
          bottom: 120px;
          margin: auto;
          object-fit: cover;
        `,
        '@keyframes animate': `
          0% {bottom: -100vh};
          100% {bottom: 125px};
        `,
        'content#body .home i': `
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
        `,
        'footer#main': `
          position: absolute;
          bottom: 15px;
          left: 0;
          right: 0;
          width: 100vw;
          height: 125px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: end;
          background: rgb(0,55,0);
          box-shadow: 0 10px 30px 45px rgb(0,55,0);
          margin: auto;
          z-index: 1000;
        `,
        'footer#main:first-child': `
          display: flex;
          align-items: center;
          justify-content: space-evenly;
        `
      },
      Style = document.createElement('style');
    Object.keys(styles).map(k => 
      Style.innerHTML+= k === 'all'
        ? `*{${styles[k]}}`
        : `${k === 'root'?':':''}${k}{${styles[k]}}`
    ); head.appendChild(Style);
  })();
  (() => {const // default components content
    page = {header, body, footer},
    links = {
      header: {
        navbar: {
          home: ['Inicio', '/inicio'],
          service: ['Servicios', '/servicios'],
          contact: ['Contacto', '/contacto']
        }
      },
      footer: {
        contact: {
          form: ['Formulario', '/form'],
        },
        social: {
          whatsapp: ['Whatsapp', '/whatsapp']
        }
      }
    },
    insertLinks = (section, Links) => {let res = '';
      Links.map(e => res+=`
        <section class="${e}">
          <ul>`+(() => {let res = '';
            Object.keys(links[section][e]).map(k => res+=
              `<li><a href="${links[section][e][k][1]}">${links[section][e][k][0]}</a>`
            ); return res;
          })()+`</ul>
        </section>`
      ); return res;},
    content = {
      header: `
        <section class="logo"><h1>-» Jardineria «-</h1>
        </section> ${insertLinks('header',['navbar'])}
      `,
      footer: `
        <div>`+insertLinks('footer',['contact','social'])+`</div>
        <p class="copyright">2021 &copy; Edwin Agudelo</p>
      `
    };
    Object.keys(content).map(k => 
      page[k].innerHTML = content[k]);
  })();
  (async () => {const  // Body content
    getImgs = await fetch('https://44b2-190-7-133-18.ngrok.io', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }),
    getData = JSON.parse(await getImgs.text()),
    routes = {
      home: (() => {let
        i=1, arr=Object.keys(getData),
        res='<section class="home">';
        arr.map(img => (res+=`
          <img src="data:image/png;base64,${getData[img]}">
          <i style="background: rgba(0,55,0,${i===1?.4:0})"></i>`
        )&& i++); res +='</section>';
        return res;
      })()
    };
    body.innerHTML = routes.home;
  })();
}; document.addEventListener('DOMContentLoaded', init);
