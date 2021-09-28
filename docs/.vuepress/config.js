const routes = [
    "Home",
    "React",
    "Spring",
    "dev-report",
    "Infra",
    "CS",
    "JS",
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
      description: '🚀 개발과 기술의 발자취 🚀',
      themeConfig: {
        logo: '/img/logo.jpg',
        nav: [
          { text: 'Home', link: '/Home/'},
            {
                text: 'Dev',
                items: [
                    {
                        text: 'Front-end',
                        items: [
                            { text: 'React', link: '/React/'},
                            { text: 'JS', link: '/JS/'},
                        ]
                    },
                    { text: 'Back-end',
                        items: [
                            { text: 'Spring', link: '/Spring/'}
                        ]
                    }
                ]
            },
          { text : 'Infra', link: '/Infra/'},
          { text : 'CS', link: '/CS/'},
          { text : '개발일기', link: '/dev-report/'},
          { text: "Github", link: "https://github.com/"},
        ],
        sidebar: createSidebar()
      },
      base: "/blog/"
  };
