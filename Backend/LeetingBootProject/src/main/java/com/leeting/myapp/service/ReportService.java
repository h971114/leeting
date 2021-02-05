package com.leeting.myapp.service;

import java.util.List;

import com.leeting.myapp.model.ReportDto;

public interface ReportService {

	 public boolean writeReport(ReportDto report);

	public List<ReportDto> listReport();

	public ReportDto getReportInfo(int reportno);

	public boolean update(ReportDto report);

	public void delete(int reportno);

}
