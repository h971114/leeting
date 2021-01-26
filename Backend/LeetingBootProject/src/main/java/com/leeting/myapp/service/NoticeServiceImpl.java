package com.leeting.myapp.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.leeting.myapp.dao.NoticeDao;
import com.leeting.myapp.model.MeetingDto;
import com.leeting.myapp.model.NoticeDto;

@Service
public class NoticeServiceImpl implements NoticeService{

	private final NoticeDao noticeDao;
	
	public NoticeServiceImpl(NoticeDao noticeDao) {
		this.noticeDao = noticeDao;
	}
	@Override
    public boolean writeNotice(NoticeDto notice, Map<String,Object> noticemap) {
	      try {
				System.out.println("확인");
				noticeDao.writeNotice(notice,noticemap);
	            return true;
	        } catch (SQLException throwables) {
	            throwables.printStackTrace();
	            return false;
	        }
    }
	@Override
	public List<NoticeDto> listNotice() {
		System.out.println("확인");
    	return noticeDao.listNotice();
	}
	@Override
	public NoticeDto getNoticeInfo(int noticeno) throws SQLException {
		NoticeDto noticeDto = null;
        noticeDto = noticeDao.noticeinfo(noticeno);
        return noticeDto;
	}
	@Override
	public boolean update(NoticeDto notice, Map<String,Object> noticemap) throws SQLException {
            System.out.println("확인");
			noticeDao.update(notice,noticemap);
			return true;
		
	}
	@Override
	public void delete(int noticeno) {
		noticeDao.delete(noticeno);
		
	}
	@Override
	public Map<String, Object> getByteImage(){
		return noticeDao.getByteImage();
	}
}
