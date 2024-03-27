var pool = require('./Bd')

async function getsabores(){
    var query= "select * from sabores";
    var rows= await pool.query(query);
    return rows;
}

async function deletesaboresById(id) {
    var query= 'DELETE FROM sabores WHERE id = ?';
    var rows= await pool.query(query, [id]);
    return rows;
}

async function insertsabores(obj){
    try {
        var query= "insert into sabores set ?";
        var rows= await pool.query (query,[obj]);
        return rows 
    } catch (error){
        console.log(error);
        throw error;
    }
}

async function getsaboresById(id){
        var query= "select * from sabores where id= ?";
        var rows= await pool.query(query,[id]);
        return rows[0];

    }

async function modificarsaboresById(obj,id){
     try{
        var query= "update sabores set ? where id= ?";
        var rows= await pool.query(query,[obj, id]);
     }catch (error){
        throw error;
     }
} 

async function  buscarsabores(busqueda){
    var query= "select * from sabores where Sabor like ? OR Gustos like ?"
    var rows=   await pool.query(query,['%' + busqueda + '%', '%' + busqueda + '%']);
    return rows;
}   

module.exports= {getsabores, deletesaboresById, insertsabores, getsaboresById, modificarsaboresById, buscarsabores }