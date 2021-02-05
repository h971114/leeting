package com.leeting.myapp.dao;

import java.sql.SQLException;
import java.util.List;

import com.leeting.myapp.model.ReportDto;

public interface ReportDao {

	public void writeReport(ReportDto report)  throws SQLException;


	public List<ReportDto> listReport();


	public ReportDto getReportInfo(int reportno);


	public void updateReport(ReportDto report);


	public void deleteReport(int reportno);

	
}
