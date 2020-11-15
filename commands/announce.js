const Discord = require("../node_modules/discord.js");

module.exports = {
    name: 'announce',
    description: 'announcement',
    execute(client, message, args){
        if(message.author.id !== "439976892343517184") return message.channel.send("Nope, you're not my master");

        const embed = new Discord.MessageEmbed()
        .setTitle('🚨ANNOUNCEMENT DEAR COMRADES🚨')
        .setThumbnail('https://i.kym-cdn.com/photos/images/original/001/464/390/36d.jpg')
        .setDescription(`
        Pembelajaran hari ini full penugasan pada progate.com
        Silakan kalian akses progate.com
        Yang belum punya akun silakan registrasi terlebih dahulu.
        Pilih dan kerjakan tema berikut:
        1. GIT
        2. SQL Study 1+Latihan Soal pada GForm
        3. Command Line

        Setelah selesai mengerjakan kumpulkan hasilanya berupa ss 
halaman akhir atau sertifikat penyelesaian tema tersebut
pada classroom yang sudah disediakan, deadline hari ini jam 16.00.

Cek kelengkapan absen dan tugas pada link:
http://bit.ly/RekapAbsendanTugasBasdat
        `)
        .setFooter(`Kaguya is currently offline, so i'll give the announcement ('-')/`)
        .setColor('#d40000')

        message.channel.send(embed);
    }
}