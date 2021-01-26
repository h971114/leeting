package com.leeting.myapp.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.leeting.myapp.model.MeetingDto;
import com.leeting.myapp.model.ParticipationDto;

public interface MeetingService {

	boolean enrollMeeting(MeetingDto meeting);
    List<MeetingDto> listMeeting(int categoryno) throws SQLException;
    MeetingDto getMeetingInfo(int meetingno);
    void delete(int meetingno);
    void update(MeetingDto meeting);
	List<ParticipationDto> listparticipants(int meetingno);
	void setmeeinglike(Map<String,Double> scoremap) throws SQLException;
	void setlikestatus(ParticipationDto participationDto) throws SQLException;
	boolean clickmeeting(ParticipationDto participationDto) throws SQLException;
	List<MeetingDto> searchByTitle(String keyword) throws SQLException;
	List<MeetingDto> searchById(String keyword) throws SQLException;
}
