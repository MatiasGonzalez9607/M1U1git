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

module.exports= { getNovedades, deleteNovedadesById }