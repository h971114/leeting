package com.leeting.myapp.service;

import java.sql.SQLException;
import java.util.List;


import com.leeting.myapp.model.MeetingDto;
import com.leeting.myapp.model.ParticipationDto;

public interface MeetingService {

	boolean enrollMeeting(MeetingDto meeting);
    List<MeetingDto> listMeeting(int categoryno) throws SQLException;
    MeetingDto getMeetingInfo(int meetingno);
    void delete(int meetingno);
    void update(MeetingDto meeting);
	List<ParticipationDto> listparticipants(int meetingno);
}
