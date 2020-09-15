//add prole players
var prolesPos = [];
var c=0;
for(let i=5;i<8;i++)
  for(let j=0;j<8;j++)
    prolesPos.push(
      {
        id:c++,
        x:j,
        y:i,
        type:0,
        color: 'dark'
});


//add bouge players
var bougePos = [];
var c=0;
  for(let j=0;j<8;j++)
  bougePos.push(
      {
        id:c++,
        x:j,
        y:6,
        type:0
      });

  bougePos = [ ...bougePos,
  {
    id:c++,
    x:0,
    y:7,
    type:1,
  },
  {
    id:c++,
    x:1,
    y:7,
    type:2,

  },
  {
    id:c++,
    x:2,
    y:7,
    type:3,
  },
  {
    id:c++,
    x:3,
    y:7,
    type:5,
  },
  {
    id:c++,
    x:4,
    y:7,
    type:4,
  },
  {
    id:c++,
    x:5,
    y:7,
    type:3,
  },
  {
    id:c++,
    x:6,
    y:7,
    type:2,
  },
  {
    id:c++,
    x:7,
    y:7,
    type:1,
  },
  ]

export const prolePos = prolesPos;
export const boujPos = bougePos;
