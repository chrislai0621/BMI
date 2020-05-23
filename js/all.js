var data = JSON.parse(localStorage.getItem("BMI")) || [];
var w = 0;
var h = 0;
var bmi = 0;
var status='';
var bgColorClass = '';
var textColorClass = '';
var borderColorClass = '';
var button = document.querySelector('.button');

button.addEventListener('click', AddBMI); 
const bmiData=[{
    bgColor: 'bg-blue',
    color: 'text-blue',
    boderColor:'border-blue',
    status:'過輕'
},
{
    bgColor: 'bg-green',
    color: 'text-green',
    boderColor: 'border-green',
    status:'理想'
},
{
    bgColor: 'bg-light-orange',
    color: 'text-light-orange',
    boderColor: 'border-light-orange',
    status:'過重'
},
{
    bgColor: 'bg-orange',
    color: 'text-orange',
    boderColor: 'border-orange',
    status:'輕度肥胖'
}, 
{
    bgColor: 'bg-orange',
    color: 'text-orange',
    boderColor: 'border-orange',
    status:'中度肥胖'
}, 
{
    bgColor: 'bg-dark-orange',
    color: 'text-dark-orange',
    boderColor: 'border-dark-orange',
    status:'重度肥胖'
} 
];
//initial
updateList();



function AddBMI() {
    w = document.getElementById('txtWeight').value;
    h = document.getElementById('txtHeight').value;
    if(w=='' || h =='')
    {
        alert('請輸入身高體重');
        return;
    }
    var colorIndex= getColorIndex();
    status = bmiData[colorIndex].status;
    bgColorClass = bmiData[colorIndex].bgColor;
    textColorClass = bmiData[colorIndex].color;
    borderColorClass = bmiData[colorIndex].boderColor;
    var pushData ={};
    pushData.colorIndex = colorIndex;
    pushData.bmi = bmi;
    pushData.weight = w;
    pushData.height = h;
    pushData.date = getDate();
    console.log(pushData);
    data.push(pushData);
    localStorage.setItem("BMI", JSON.stringify(data));    
    updateView();
}

function getColorIndex()
{
    //w = 體重，單位：公斤;
    //h = 身高，單位：公尺;
    //BMI = 身高體重指數，單位：公斤/平方公尺
    let hSquare= 0;
  
    hSquare = h/100;
    bmi = (w / (hSquare * hSquare)).toFixed(2);
    var colorIndex=0;
    if(bmi>40)
    {
        colorIndex = 5;
    }
    else if (bmi > 35)
    {
          colorIndex = 4;
    } 
    else if (bmi > 30)
    {
          colorIndex = 3;
    } 
     else if (bmi > 25)
    {
          colorIndex = 2;
    } 
    else if (bmi > 18.5)
    {
          colorIndex = 1;
    } 
    else
    {
          colorIndex = 0;
    }
   return colorIndex;
}
function updateView() {
    var divResult = document.querySelectorAll('.div-result');
    var btnResult = document.querySelector('.btn-result');
    var imgLoop = document.querySelector('.img-loop');
   
    button.classList.add('d-none');
    for (let i = 0; i < divResult.length;i++)
    {
        divResult[i].classList.remove('div-result');
    }
    document.getElementById('resultBmi').innerHTML = "<span class='" + textColorClass +"'>"+  bmi +"</span>";
    document.getElementById('resultTitle').innerHTML = "<span class='" + textColorClass + "'>BMI</span>";
    document.getElementById('resultStatus').innerHTML = "<span class='" + textColorClass + "'>" + status + "</span>";
    
    let currentIndex = data.length - 1; 
    let currentColorIndex = data[currentIndex].colorIndex;
    btnResult.classList.add(bmiData[currentColorIndex].boderColor);
    imgLoop.classList.add(bmiData[currentColorIndex].bgColor);
    updateList();
   
}
function updateList()
{
    var bmiTables = document.querySelector('.bmi-tables');
    var tableHtml = '';
    for (let i = 0; i < data.length; i++) {
        let colorIndex = data[i].colorIndex;
        let bgColor = bmiData[colorIndex].bgColor;
        let status = bmiData[colorIndex].status;
        tableHtml += '<table class="table mx-auto bg-white mb-3" >';
        tableHtml += '<tr>';
        tableHtml += '<td class="' + bgColor + ' text-nowrap px-0" width="7px">&nbsp;</td>';
        tableHtml += '<td class="align-middle text-nowrap py-4 font-20" width="110px">' + status + '</td>';
        tableHtml += '<td class="align-middle text-nowrap font-12" width="140px">BMI <span class="font-20">' + data[i].bmi + '</span></td>';
        tableHtml += '<td class="align-middle text-nowrap font-12" width="140px">weight <span class="font-20">' + data[i].weight + 'KG</span></td>';
        tableHtml += '<td class="align-middle text-nowrap font-12" width="140px">height <span class="font-20">' + data[i].height + 'cm</span></td>';
        tableHtml += '<td class="align-middle text-nowrap font-12" width="107px">' + data[i].date + '</span></td >';
        tableHtml += ' </tr >';
        tableHtml += ' </table >';
    }
    bmiTables.innerHTML = tableHtml;
}
function getDate()
{
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = 
        (month < 10 ? '0' : '') + month + '-' +
        (day < 10 ? '0' : '') + day + '-' + 
         + d.getFullYear();
    return output;
}
