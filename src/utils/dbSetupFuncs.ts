export const createTables = (tx: any) => {
    tx.executeSql('CREATE TABLE IF NOT EXISTS users (email TEXT UNIQUE , password TEXT, isAdmin INTEGER, isDeactivated)')
    tx.executeSql('CREATE TABLE IF NOT EXISTS products (name TEXT UNIQUE, description TEXT, imageURL)')
    tx.executeSql('CREATE TABLE IF NOT EXISTS errors (user_email, message, stacktrace, datetime)')
    tx.executeSql('CREATE TABLE IF NOT EXISTS results (user_email, f_product, s_product, datetime)')
}

export const seedTables = (tx: any) => {
    tx.executeSql('SELECT count(*) AS productsCount FROM products', [], function (tx: any, rs: any) {
        if (rs.rows.item(0).productsCount === 0) {
            tx.executeSql('INSERT INTO products VALUES (?1,?2,?3)', ['Yara Liva', 'Yara Liva Description', 'https://brandcenter.yara.com/fr/gallery/12632/images/lowres/faffd2805174417c9f29b648d2a598ee.png'])
            tx.executeSql('INSERT INTO products VALUES (?1,?2,?3)', ['Yara Mila', 'Yara Mila Description', 'https://brandcenter.yara.com/fr/gallery/12632/images/lowres/9f4bfd3392cc4afa88bcda9e1bae4d12.png'])
            tx.executeSql('INSERT INTO products VALUES (?1,?2,?3)', ['Yara Bela', 'Yara Bela Description', 'https://brandcenter.yara.com/fr/gallery/12632/images/lowres/6c3263fb17654accafebbb5523a50ef2.png'])
            tx.executeSql('INSERT INTO products VALUES (?1,?2,?3)', ['Yara Vera', 'Yara Vera Description', 'https://brandcenter.yara.com/fr/gallery/12632/images/lowres/e22b2270782047aca40161e3a55a6981.png'])
            tx.executeSql('INSERT INTO products VALUES (?1,?2,?3)', ['Yara Vita', 'Yara Vita Description', 'https://brandcenter.yara.com/fr/gallery/12632/images/lowres/a401c1234c244c18bd7fe62fb3b622a0.png'])
            tx.executeSql('INSERT INTO products VALUES (?1,?2,?3)', ['Yara Tera', 'Yara Tera Description', 'https://brandcenter.yara.com/fr/gallery/12632/images/lowres/8ce4d17be6da4f5ca04291fe3cdea493.png'])
            tx.executeSql('INSERT INTO products VALUES (?1,?2,?3)', ['Yara Rega', 'Yara Rega Description', 'https://brandcenter.yara.com/fr/gallery/12632/images/lowres/36c5a49a06ae479ea744ddf16b5ce575.png'])
            tx.executeSql('INSERT INTO products VALUES (?1,?2,?3)', ['Yara Basa', 'Yara Basa Description', 'https://brandcenter.yara.com/fr/gallery/12632/images/lowres/f66b241cffee49018102eaad0376f951.png'])
            tx.executeSql('INSERT INTO users VALUES (?1,?2,?3,?4)', ['we1000@abv.bg', '14', 1, 0])
            tx.executeSql('INSERT INTO users VALUES (?1,?2,?3,?4)', ['viktoriyaboneva@gmail.com', '14', 0, 0])
            tx.executeSql('INSERT INTO users VALUES (?1,?2,?3,?4)', ['todorovangel14@gmail.com', '14', 0, 0])
        }
    }, function (tx: any, error: any) {
        console.log('SELECT error: ' + error.message)
    })
}