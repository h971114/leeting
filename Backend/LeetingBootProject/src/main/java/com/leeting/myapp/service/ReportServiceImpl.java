package com.leeting.myapp.service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.leeting.myapp.dao.ReportDao;
import com.leeting.myapp.model.ReportDto;

@Service
public class ReportServiceImpl implements ReportService{

private final ReportDao reportDao;
	
	public ReportServiceImpl(ReportDao reportDao){
	    this.reportDao = reportDao;
    }

	
	@Override
    public boolean writeReport(ReportDto report) {
	      try {
				System.out.println("확인");
				reportDao.writeReport(report);
	            return true;
	        } catch (SQLException throwables) {
	            throwables.printStackTrace();
	            return false;
	        }
    }


	@Override
	public List<ReportDto> listReport() {
		// TODO Auto-generated method stub
		return reportDao.listReport();
	}


	@Override
	public ReportDto getReportInfo(int reportno) {
		// TODO Auto-generated method stub
		return reportDao.getReportInfo(reportno);
	}


	@Override
	public boolean update(ReportDto report) {
		 System.out.println("확인");
		reportDao.updateReport(report);
		return true;
	}


	@Override
	public void delete(int reportno) {
		reportDao.deleteReport(reportno);
		
	}
	
	
}
