package com.leeting.myapp.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.leeting.myapp.model.MeetingDto;

public interface MeetingDao {
	public void enrollMeeting(MeetingDto meeting) throws SQLException;
    public List<MeetingDto> listMeeting(int categoryno)  throws SQLException;
    public MeetingDto meetinginfo(int meetingno) throws SQLException;
	public void delete(int meetingno) throws SQLException;
	public void update(MeetingDto meeting) throws SQLException;
}