const form_register=document.getElementById('form_register')
const form_code=document.getElementById('code')
const form_name=document.getElementById('name')
const form_stock=document.getElementById('stock')
const form_price=document.getElementById('price')
const form_date=document.getElementById('date')
const body=document.getElementById('body')
const suma=document.getElementById('suma')
const verification=document.getElementById('verification')
const cancel=document.getElementById('cancel')
const sTotal=document.getElementById('s_total')
const sDinero=document.getElementById('s_dinero')
const sElemento=document.getElementById('s_elementos')
const date_array=[]
const StoreGlobal=JSON.parse(localStorage.getItem('code'))

form_register.addEventListener('submit',(e)=>{
    e.preventDefault()
    if (verification.value==="") {
        AddDate()
    }else{
        Editar()
    }
    mostrar_date()
    sumar_date() 
})

cancel.addEventListener("click",()=>{
    form_register.reset()
})

/***funcion agregar datos */
const AddDate=()=>{

    const date_input={
        code:form_code.value,
        name:form_name.value,
        stock:form_stock.value,
        price:form_price.value,
        date:form_date.value,      
    }

    if(localStorage.getItem('code')===null){
        date_array.push(date_input)
        localStorage.setItem('code',JSON.stringify(date_array))
    }else{
        //const new_array =JSON.parse(localStorage.getItem('code'))
        StoreGlobal.push(date_input)
        localStorage.setItem('code',JSON.stringify(StoreGlobal))
        form_register.reset()
    }
}

/****funcion mostrando datos */
const mostrar_date=()=>{
    
    body.innerHTML=''
   if (StoreGlobal===null) {
       console.log('nada que mostrar')
   }else{
    for(let index of StoreGlobal)
    {
        
        body.innerHTML+=`
        <tr onclick="CapturarDatos('${index.code}')">
        <td>${index.code}</td>
        <td>${index.name}</td>
        <td>${index.stock}</td>
        <td>${index.price}</td>
        <td>${index.date}</td>
        <td class="text-warning text-center"><i class="fas fa-edit"></i></td>
        <td class="text-danger text-center" onclick="delet('${index.code}')"><i class="fas fa-trash-alt"></i></td>
       
        </tr>
        `
    }
}
   
}
mostrar_date()

/*sumatoria*/
const sumar_date=()=>{
     

    suma.innerHTML=''
   if (StoreGlobal===null) {
       console.log('nada que sumar')
   }else{
    for(let index of StoreGlobal)
    {
        
        suma.innerHTML+=`
        <tr onclick="CapturarDatos('${index.price}''${index.stock}')">
        <td></td>
        <td>${index.stock}</td>
        <td>${index.price}</td>
        </tr>
        `
    } 
   }
}
sumar_date() 




/***funcion eliminar datos :S */
const delet=(value)=>{
   

    for (let index = 0; index < StoreGlobal.length; index++) {
      if (StoreGlobal[index].code===value) {
        StoreGlobal.splice(index, 1)
      }
      localStorage.setItem('code',JSON.stringify(StoreGlobal))
    }
    mostrar_date()
    form_register.reset()
}

/***funcion llenar datos en los type input :S */
const CapturarDatos=(value)=>{
   // const datoslocal=JSON.parse(localStorage.getItem('code'))

    for(let index of StoreGlobal){
        if (index.code===value) {
            form_code.value=index.code
            form_name.value=index.name
            form_stock.value=index.stock
            form_price.value=index.price
            verification.value=index.code
        }
    }
}

/****funcion editar datos :S */
const Editar=()=>{
    const newdate={
        code:form_code.value,
        name:form_name.value,
        stock:form_stock.value,
        price:form_price.value
    }

    //const localdatos=JSON.parse(localStorage.getItem('code'));

   for(let index=0;index<StoreGlobal.length;index++){
       if (StoreGlobal[index].code===newdate.code) {
           StoreGlobal[index]=newdate
       }
       localStorage.setItem('code',JSON.stringify(StoreGlobal))
       form_register.reset()
   }
   mostrar_date()

}

/****proceso filtracion de datos :S */
const txt_filtrar=document.getElementById('txt_filtrar')

txt_filtrar.addEventListener('keyup',(e)=>{
    //const FiltrarStore=JSON.parse(localStorage.getItem('code'))
    body.innerHTML=''
    for(let index of StoreGlobal)
    {
        const value=index.name.includes(e.target.value)
        
        if (value) {
            body.innerHTML+=`
            <tr onclick="CapturarDatos('${index.code}')">
            <td>${index.code}</td>
            <td>${index.name}</td>
            <td>${index.stock}</td>
            <td>${index.price}</td>
            <td class="text-warning text-center"><i class="fas fa-edit"></i></td>
            <td class="text-danger text-center"><i class="fas fa-onclick="delet('${index.code}')"><i class="fas fa-trash-alt"></i></td>
            </tr>
            `
        }
    }
})
/* reloj */
(function(){
	var actualizarHora = function(){
		// Obtenemos la fecha actual, incluyendo las horas, minutos, segundos, dia de la semana, dia del mes, mes y año;
		var fecha = new Date(),
			horas = fecha.getHours(),
			ampm,
			minutos = fecha.getMinutes(),
			segundos = fecha.getSeconds(),
			diaSemana = fecha.getDay(),
			dia = fecha.getDate(),
			mes = fecha.getMonth(),
			year = fecha.getFullYear();

		// Accedemos a los elementos del DOM para agregar mas adelante sus correspondientes valores
		var pHoras = document.getElementById('horas'),
			pAMPM = document.getElementById('ampm'),
			pMinutos = document.getElementById('minutos'),
			pSegundos = document.getElementById('segundos'),
			pDiaSemana = document.getElementById('diaSemana'),
			pDia = document.getElementById('dia'),
			pMes = document.getElementById('mes'),
			pYear = document.getElementById('year');

		
		// Obtenemos el dia se la semana y lo mostramos
		var semana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
		pDiaSemana.textContent = semana[diaSemana];

		// Obtenemos el dia del mes
		pDia.textContent = dia;

		// Obtenemos el Mes y año y lo mostramos
		var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
		pMes.textContent = meses[mes];
		pYear.textContent = year;

		// Cambiamos las hora de 24 a 12 horas y establecemos si es AM o PM

		if (horas >= 12) {
			horas = horas - 12;
			ampm = 'PM';
		} else {
			ampm = 'AM';
		}

		// Detectamos cuando sean las 0 AM y transformamos a 12 AM
		if (horas == 0 ){
			horas = 12;
		}

		// Si queremos mostrar un cero antes de las horas ejecutamos este condicional
		// if (horas < 10){horas = '0' + horas;}
		pHoras.textContent = horas;
		pAMPM.textContent = ampm;

		// Minutos y Segundos
		if (minutos < 10){ minutos = "0" + minutos; }
		if (segundos < 10){ segundos = "0" + segundos; }

		pMinutos.textContent = minutos;
		pSegundos.textContent = segundos;
	};

	actualizarHora();
	var intervalo = setInterval(actualizarHora, 1000);
}())