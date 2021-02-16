package com.leeting.myapp.model;

import org.springframework.web.multipart.MultipartFile;

public class QuestionDto {
	
	private int ROWNUM;
	private int no;
	private int type;
	private String title;
	private String detail;
	private String qwriter;
	private String date;
	private MultipartFile file1;
	private MultipartFile file2;
	private MultipartFile file3;
	public QuestionDto() {
		super();
	}
	
	public QuestionDto(int no, int type, String title, String detail, String qwriter, String date, MultipartFile file1,
			MultipartFile file2, MultipartFile file3) {
		super();
		this.no = no;
		this.type = type;
		this.title = title;
		this.detail = detail;
		this.qwriter = qwriter;
		this.date = date;
		this.file1 = file1;
		this.file2 = file2;
		this.file3 = file3;
	}

	public int getROWNUM() {
		return ROWNUM;
	}
	public void setROWNUM(int rOWNUM) {
		ROWNUM = rOWNUM;
	}
	
	public String getqwriter() {
		return qwriter;
	}

	public void setqwriter(String qwriter) {
		this.qwriter = qwriter;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public int getNo() {
		return no;
	}
	public void setNo(int no) {
		this.no = no;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
	public MultipartFile getFile1() {
		return file1;
	}
	public void setFile1(MultipartFile file1) {
		this.file1 = file1;
	}
	public MultipartFile getFile2() {
		return file2;
	}
	public void setFile2(MultipartFile file2) {
		this.file2 = file2;
	}
	public MultipartFile getFile3() {
		return file3;
	}
	public void setFile3(MultipartFile file3) {
		this.file3 = file3;
	}
	@Override
	public String toString() {
		return "QuestionDto [ROWNUM=" + ROWNUM + ", no=" + no + ", type=" + type + ", title=" + title + ", detail="
				+ detail + ", qwriter=" + qwriter + ", date=" + date + ", file1=" + file1 + ", file2=" + file2
				+ ", file3=" + file3 + "]";
	}
	
	
}
