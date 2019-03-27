const basePath="http://121.196.201.35:8080/phms/";
export default Config={
    LOGIN:basePath+"login/login",//登陆
    LOGIN_OUT:basePath+"login/loginOut",//推出
    REGISTER:basePath+"login/register",//登陆注册接口
    ESSAY:basePath+"essay/pageEssays",//文章列表接口
    ESSAY_DETAil:basePath+"essay/getEssayById",//文章相亲接口
    ESSAY_COMMENT:basePath+"commen/saveComment",//文章评论接口
    ESSAY_SAVE:basePath+"essay/saveEssay",//添加文章
    GET_DOCTORS:basePath+"/doctor/listDoctors",//获取所以的医生
    FOOD_SAVE:basePath+"/food/saveFood",//保存饮食数据
    GET_FOODS:basePath+"/food/pageFoods",//饮食数据
    HEALTH_DETAil:basePath+"/health/getHealthById",//根据用户id查询健康详情
    DOCTOR_DETAil:basePath+"/doctor/getDoctorById",//健康详情
};