const data = [{
        "id": "1",
        "name": "google",
        "url": "www.google.com",
        "subData": [{
                "id": "2",
                "name": "walla",
                "url": "www.walla.co.il"
            },
            {
                "id": "3",
                "name": "ynet",
                "url": "www.ynet.co.il",
                "subData": [{
                        "id": "4",
                        "name": "mako",
                        "url": "www.mako.co.il"
                    },
                    {
                        "id": "5",
                        "name": "google",
                        "url": "www.google.com"
                    },
                    {
                        "id": "6",
                        "name": "walla",
                        "url": "www.walla.co.il"
                    }
                ]
            },
            {
                "id": "7",
                "name": "google",
                "url": "www.google.com"
            }
        ]
    },
    {
        "id": "8",
        "name": "ynet",
        "url": "www.ynet.co.il",
        "subData": [{
                "id": "9",
                "name": "walla",
                "url": "www.walla.co.il"
            },
            {
                "id": "10",
                "name": "google",
                "url": "www.google.com",
                "subData": [{
                        "id": "11",
                        "name": "ynet",
                        "url": "www.ynet.co.il",
                        "subData": [{
                                "id": "12",
                                "name": "walla",
                                "url": "www.walla.co.il"
                            },
                            {
                                "id": "13",
                                "name": "google",
                                "url": "www.google.com"
                            },
                            {
                                "id": "14",
                                "name": "mako",
                                "url": "www.mako.co.il",
                                "subData": [{
                                    "id": "11",
                                    "name": "ynet",
                                    "url": "www.ynet.co.il",
                                    "subData": [{
                                            "id": "12",
                                            "name": "walla",
                                            "url": "www.walla.co.il"
                                        },
                                        {
                                            "id": "13",
                                            "name": "google",
                                            "url": "www.google.com"
                                        },
                                        {
                                            "id": "14",
                                            "name": "mako",
                                            "url": "www.mako.co.il"
                                        }
                                    ]
                                }]
                            }
                        ]
                    },
                    {
                        "id": "15",
                        "name": "google",
                        "url": "www.google.com"
                    },
                    {
                        "id": "16",
                        "name": "mako",
                        "url": "www.mako.co.il"
                    }
                ]
            },
            {
                "id": "17",
                "name": "walla",
                "url": "www.walla.co.il",
                "subData": [{
                        "id": "18",
                        "name": "ynet",
                        "url": "www.ynet.co.il"
                    },
                    {
                        "id": "19",
                        "name": "google",
                        "url": "www.google.com"
                    },
                    {
                        "id": "20",
                        "name": "walla",
                        "url": "www.walla.co.il"
                    }
                ]
            },
            {
                "id": "21",
                "name": "mako",
                "url": "www.mako.co.il"
            }
        ]
    }
]


window.onload = () => {
    let body = document.querySelector('body');

    // Default colors (same as in the word document) - other colors will be generated randomly
    let color = ['#add8e6', '#87cefa', '#b0c4de', '#ffa07a']

    body.style.display = "flex"
    body.style.alignItems = "flex-start";
    body.style.gap = "15px";

    showData(data, body, color);
}

const getRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}


const getColor = (color, deepLevel) => {
    if (!color[deepLevel]) {
        color.push(getRandomColor());
    }
    return color[deepLevel];
}

const getDivDetails = (id, name, url, deepLevel, color) => {

    const div = document.createElement('div');
    const pId = document.createElement('p');
    const pName = document.createElement('p');
    const pUrl = document.createElement('p');

    div.style.background = getColor(color, deepLevel);
    div.style.border = "solid 1px black";
    div.style.borderRadius = '25px'
    div.style.margin = "10px"
    div.style.padding = "0 4px 0 20px"
    div.style.position = "relative";
    div.style.left = (deepLevel == 0 ? '0px' : '10px');

    pId.textContent = `Id: ${id}`
    pName.textContent = `Site Name: ${name}`
    pUrl.innerHTML = `<a href="https://${url}" target="_blank">Site Url: ${name}</a>`

    div.append(pId, pName, pUrl)
    return div
}


const showData = (data, body, color) => {

    const showSubData = (data, parentDiv, deepLevel) => {
        if (data.subData) {

            data.subData.forEach((element) => {
                const childDiv = getDivDetails(element.id, element.name, element.url, deepLevel, color)
                parentDiv.appendChild(childDiv);
                showSubData(element, childDiv, deepLevel + 1);
            });
        }
    }


    data.map((element) => {
        const parentDiv = getDivDetails(element.id, element.name, element.url, 0, color)
        body.appendChild(parentDiv);
        showSubData(element, parentDiv, 1);
    })
}