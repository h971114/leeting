package com.leeting.myapp.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.leeting.myapp.model.NoticeDto;

@Repository
public class NoticeDaoImpl implements NoticeDao{

	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public void writeNotice(NoticeDto notice, Map<String,Object> noticemap)  throws SQLException{
		sqlSession.insert("notice.writeNotice",notice);
		noticemap.put("title", notice.getTitle());
		if(noticemap.get("file1") != null) sqlSession.update("notice.putImage",noticemap);
	//	if(noticemap.get("file2") != null) sqlSession.insert("notice.putImage2",noticemap);
	//	if(noticemap.get("file3") != null) sqlSession.insert("notice.putImage3",noticemap);
	}

	@Override
	public List<NoticeDto> listNotice() {
		// TODO Auto-generated method stub
		return sqlSession.selectList("notice.listNotice");
	}

	@Override
	public NoticeDto noticeinfo(int noticeno) {
		sqlSession.update("notice.noticehit",noticeno);
		return sqlSession.selectOne("notice.noticeinfo",noticeno);
	}

	@Override
	public void update(NoticeDto notice, Map<String,Object> noticemap) {
		sqlSession.update("notice.noticemodify",notice);
		sqlSession.update("notice.noticefilemodify",noticemap);
	}

	@Override
	public void delete(int noticeno) {
		sqlSession.delete("notice.noticedelete",noticeno);
		
	}
	@Override
	public Map<String, Object> getByteImage() {
	    return sqlSession.selectOne("notice.getByteImage");
	}

}
