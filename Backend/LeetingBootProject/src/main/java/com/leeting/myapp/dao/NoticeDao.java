package com.leeting.myapp.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.leeting.myapp.model.MeetingDto;
import com.leeting.myapp.model.NoticeDto;

public interface NoticeDao {

	public void writeNotice(NoticeDto notice, Map<String,Object> noticemap)  throws SQLException;

	public List<NoticeDto> listNotice();

	public NoticeDto noticeinfo(int noticeno);

	public void update(NoticeDto notice, Map<String,Object> noticemap);

	public void delete(int noticeno);

	public  Map<String, Object> getByteImage();
}
