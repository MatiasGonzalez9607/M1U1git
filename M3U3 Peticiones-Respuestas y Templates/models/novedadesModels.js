var pool = require('./bs')

async function getNovedades(){
    var query= "select * from novedades order by id desc";
    var rows= await pool.query(query);
    return rows;
}

async function deleteNovedadesById(id) {
    var query= 'DELETE FROM novedades WHERE id = ?';
    var rows= await pool.query(query, [id]);
    return rows;
}

async function insertNovedades(obj){
    try {
        var query= "insert into novedades set ?";
        var rows= await pool.query (query,[obj]);
        return rows 
    } catch (error){
        console.log(error);
        throw error;
    }
}

async function getNovedadById(id){
        var query= "select * from novedades where id= ?";
        var rows= await pool.query(query,[id]);
        return rows[0];

    }

async function modificarNovedadById(obj,id){
     try{
        var query= "update novedades set ? where id= ?";
        var rows= await pool.query(query,[obj, id]);
     }catch (error){
        throw error;
     }
}   
    


module.exports= { getNovedades, deleteNovedadesById, insertNovedades, getNovedadById, modificarNovedadById }