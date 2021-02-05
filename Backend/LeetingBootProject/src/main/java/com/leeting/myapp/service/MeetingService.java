package com.leeting.myapp.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.leeting.myapp.model.MeetingDto;
import com.leeting.myapp.model.NoticeDto;
import com.leeting.myapp.model.ParticipationDto;
import com.leeting.myapp.model.ReviewDto;

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
	List<MeetingDto> searchAll(String keyword) throws SQLException;
	List<MeetingDto> searchByTitle(String keyword) throws SQLException;
	List<MeetingDto> searchById(String keyword) throws SQLException;
	List<ReviewDto> getReview(int meetingno) throws SQLException;
	boolean postReview(ReviewDto reviewDto) throws SQLException;
	boolean updateReview(ReviewDto reviewDto) throws SQLException;
	boolean deleteReview(int no) throws SQLException;
	boolean enrollPhoto(Map<String, Object> meetingmap);
	List<MeetingDto> hostMeetinglist(String hostid);
	List<NoticeDto> meetingnoticelist(int meetingno);
	boolean meetingnoticewrite(NoticeDto notice, Map<String, Object> noticemap);
	NoticeDto getNoticeInfo(int meetingnoticeno);
	boolean updatenotice(NoticeDto notice, Map<String, Object> noticemap);
	void deletenotice(int noticeno);
}
