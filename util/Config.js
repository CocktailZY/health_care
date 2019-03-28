const basePath="http://121.196.201.35:8080/phms/";
export default Config={
    LOGIN:basePath+"login/login",//登陆
    LOGIN_OUT:basePath+"login/loginOut",//推出
    REGISTER:basePath+"login/register",//登陆注册接口
    ESSAY:basePath+"essay/pageEssays",//文章列表接口
    ESSAY_DETAil:basePath+"essay/getEssayById",//文章相亲接口
    ESSAY_COMMENT:basePath+"comment/saveComment",//文章评论接口
    ESSAY_SAVE:basePath+"essay/saveEssay",//添加文章
    GET_DOCTORS:basePath+"/doctor/listDoctors",//获取所以的医生
    PAGE_DOCTORS:basePath+"/doctor/pageDoctors",//获取分页的医生
    FOOD_SAVE:basePath+"/food/saveFood",//保存饮食数据
    GET_FOODS:basePath+"/food/pageFoods",//饮食数据
    HEALTH_DETAil:basePath+"/health/getHealthById",//根据用户id查询健康详情
    DOCTOR_DETAil:basePath+"/doctor/getDoctorByUserId",//医生详情
    DRUGS:basePath+"/drugs/pageDrugses",//用药列表
    DRUGS_SAVE:basePath+"/drugs/saveDrugs",//添加用药
    Drugs_DETAil:basePath+"/drugs/getDrugsById",//用药详情
    MOTIONS:basePath+"/motion/pageList",//获取运动列表
    MOTION_SAVE:basePath+"/motion/saveMotion",//保存运动
    CHAT_COUNT:basePath+"/chat/getCount",//获取咨询总数
    CHAT_HISTORY:basePath+"/chat/listChats",//获取咨询总数
    CHATE_SAVE:basePath+"/chat/saveChat",//咨询或是回复
    GET_USERS_BY_IDS:basePath+"/user/getUsersByIds",//咨询或是回复
    GET_HISTORY:basePath+"/sick/listSicks",//查询病史

};