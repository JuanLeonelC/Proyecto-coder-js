let menu = [{ id: 1, nombre: 'Pizza', precio: 20, stock: '3' },
{ id: 2, nombre: 'Pancho', precio: 3, stock: '7' },
{ id: 3, nombre: 'Hamburguesa', precio: 15, stock: '0' }];
alert("Hola, bienvenido al restaurante");
function CalcPrecio(id) {
    if (menu[id].stock > 0) {
        precio += menu[id].precio;
        menu[id].stock--;
        alert("su pedido de " + menu[id].nombre + " ha sido agregado al carrito");
        return precio;
    }
    else{
        alert("No hay mas stock");
    }    

}
let precio = 0;
let opcion
do{
    let opcion = prompt('que desea hacer\n 1. Ver menu\n 2. pedir comida\n 3. retirar su comida\n 4. Salir');
    if (opcion == 1) {
        alert('El menu es:');
        for (comida in menu) {
            alert(menu[comida].nombre + ' ' + menu[comida].precio + ' ' + menu[comida].stock);
        }
    }
    if (opcion == 2) {
        let pedir = prompt('Que desea pedir?\n' + 
            menu[0].id + '- ' +menu[0].nombre + ' vale ' + menu[0].precio + ' tenemos ' + menu[0].stock + "\n" +
            menu[1].id + '- ' + menu[1].nombre + ' vale ' + menu[1].precio + ' tenemos ' + menu[1].stock + "\n" +
            menu[2].id + '- ' + menu[2].nombre + ' vale ' + menu[2].precio + ' tenemos ' + menu[2].stock);
        if (pedir > 0 && pedir < 4) {
            pedir -= 1;
            CalcPrecio(pedir);
        }
        else{
            alert('No existe esa opcion');
        }
    }
    if (opcion == 3) {
        if (precio > 0) {
            alert('Su pedido es un total de: $' + precio);
            precio = 0;
            break;
        } else {
            alert('No tiene nada en su pedido');
        }
    }
    if (opcion == 4) {
        break;
    }
}while (opcion != 4); {
    alert("Adios");
}