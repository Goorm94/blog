const routes = [
    "Home",
    "React",
    "nodeJS"
  ];
  
  const createSidebar = () => {
    const sidebar = {};
    for (const route of routes) {
      Object.assign(sidebar, require("../" + route));
    }
    return sidebar;
  };
  
  module.exports = {
      title: '강해지고 싶은 개발자',
      description: '3대 500 목표로 하는 개발자의 블로그입니다 🚀',
      themeConfig: {
        logo: '/img/logo.jpg',
        nav: [
          { text: 'Home', link: '/Home/'},
          { 
            text: 'Dev',
            items: [
              { 
                text: 'Front-end Framework',
                items: [
                  { text: 'React', link: '/React/'}
                ]
              },
              { text: 'Back-end Framework',
                items: [
                  { text: 'nodeJS', link: '/nodeJS/'}
                ]
              }
            ]
          },
          { text: "Github", link: "https://github.com/nywwwww" }
        ],
        sidebar: createSidebar()
      },
      base: "/blog/"
  };