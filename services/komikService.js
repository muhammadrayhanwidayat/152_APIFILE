async function createKomik(database, komikData) {
    const { judul, deskripsi, penulis, imageType, imageName, imageData } = komikData;

    if (!judul || !deskripsi || !penulis) {
        throw new Error('Judul, deskripsi, dan penulis wajib diisi.');
    }

    const newKomik = await database.Komik.create({
        judul,
        deskripsi,
        penulis,
        imageType: imageType || null,
        imageName: imageName || null,
        imageData: imageData || null
    });

    return newKomik;
}

async function getAllKomiks(database) {
    const komiks = await database.Komik.findAll();

    return komiks.map(k => {
        if (k.imageData) {
            k.imageData = k.imageData.toString('base64');
        }
        return k;
    });
}

async function getKomikById(database, id) {
    const komik = await database.Komik.findByPk(id);

    if (komik && komik.imageData) {
        komik.imageData = komik.imageData.toString('base64');
    }

    return komik;
}

async function updateKomik(database, id, komikData) {
    const komik = await database.Komik.findByPk(id);

    if (!komik) {
        throw new Error(`Komik dengan ID ${id} tidak ditemukan.`);
    }

    await komik.update(komikData);
    return komik;
}

async function deleteKomik(database, id) {
    const komik = await database.Komik.findByPk(id);

    if (!komik) {
        throw new Error(`Komik dengan ID ${id} tidak ditemukan.`);
    }

    await komik.destroy();

    return { message: `Komik dengan ID ${id} berhasil dihapus.` };
}

module.exports = {
    createKomik,
    getAllKomiks,
    getKomikById,
    updateKomik,
    deleteKomik
}
