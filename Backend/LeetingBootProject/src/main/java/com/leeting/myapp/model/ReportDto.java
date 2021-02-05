package com.leeting.myapp.model;

public class ReportDto {

	private int no;
	private String id;
	private String reportid;
	private String detail;
	private String date;
	public ReportDto() {
		super();
	}
	public ReportDto(int no, String id, String reportid, String detail, String date) {
		super();
		this.no = no;
		this.id = id;
		this.reportid = reportid;
		this.detail = detail;
		this.date = date;
	}
	
	public ReportDto(String id, String reportid, String detail, String date) {
		super();
		this.id = id;
		this.reportid = reportid;
		this.detail = detail;
		this.date = date;
	}
	public int getNo() {
		return no;
	}
	public void setNo(int no) {
		this.no = no;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getReportid() {
		return reportid;
	}
	public void setReportid(String reportid) {
		this.reportid = reportid;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	@Override
	public String toString() {
		return "ReportDto [no=" + no + ", id=" + id + ", reportid=" + reportid + ", detail=" + detail + ", date=" + date
				+ "]";
	}
	
	
}
