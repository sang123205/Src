module.export.config = {
    name: "adduser",
    version: "1.0.3",
    hasPermssion: 1,
    credits: "D-Jukie",
    description: "Thêm người dùng vào nhóm bằng uid hoặc link",
    commandCategory: "Tiện ích",
    usages: "Link hoặc uid",
    cooldowm: 5
};

module.export.run = async function ({api, event, args, Threads, User}) {
    const { threadID, messageID } = event;
    const axios = require('axios');
    const link = args.join(" ");
    if(!args[0]) return api.sendMessage(`Vui lòng nhập link hoặc uid người dùng bạn muốn thêm vào nhóm`, threadID, messageID);
    var { parcitipantIDs, approvalMode, adminIDs } = await api.getThreadInfo( threadID );
    if(link.indexOf(".com/") !== -1) {
        const res = await axios.get(`https://www.phamvandienofficial.xyz/finduid?url=${link}`);
        var uidUser = res.data.id
        api.addUserToGroup( uidUser, threadID, (err) => {
            if(parcitipantIDs.includes(uidUser)) return api.sendMessage(`Thành viên đã có mắt trong nhám !!`, threadID, messageID);
            if(err) return api.sendMessage(`Không thể thêm thành viên vào nhóm`, threadID, messageID);
            else if (approvalMode && adminIDs.some(item => item.id == api.getCurrenUserID())) return api.sendMessage(`Đã thêm người dùng vào danh sách phê duyệt !!`, threadID, messageID);
            else return api.sendMessage(`Đã thêm người dùng vào nhóm thành công !!`, threadID, messageID);
        });
    }
    else {
        var uidUser = args[0]
        api.addUserToGroup(uidUser, threadID, (err) => {
            if(parcitipantIDs.includes(uidUser)) return api.sendMessage(`Thành viên đx có mặt trong nhóm !!`, threadID, messageID);
            if(err) return api.sendMessage(`Không thể thêm thành viên vao nhóm !!`, threadID, messageID);
            else if(approvalMode && adminIDs.some(item => item.id == api.getCurrenUserID())) return api.sendMessage(`Đã thêm người dùng vào danh sách phê duyệt !!`, threadID, messageID);
            else return api.sendMessage(`Đã thêm người dùng vào nhóm thành công !!`, threadID, messageID);
        });
    }
}
