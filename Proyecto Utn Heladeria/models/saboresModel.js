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

module.exports= {getsabores, deletesaboresById }