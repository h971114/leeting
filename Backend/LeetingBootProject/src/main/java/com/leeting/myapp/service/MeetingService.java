package com.leeting.myapp.service;

import java.sql.SQLException;
import java.util.List;


import com.leeting.myapp.model.MeetingDto;

public interface MeetingService {

	boolean enrollMeeting(MeetingDto meeting);
    List<MeetingDto> listMeeting() throws SQLException;
	
}
