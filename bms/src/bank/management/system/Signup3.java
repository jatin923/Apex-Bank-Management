package bank.management.system;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Random;
import javax.swing.*;

public class Signup3 extends JFrame implements ActionListener {

    JRadioButton r1, r2, r3, r4;
    JCheckBox c1, c2, c3, c4, c5, c6, c7;
    JButton s, c;
    String formno;

    Signup3(String formno) {
        this.formno = formno;

        ImageIcon i1 = new ImageIcon(
                ClassLoader.getSystemResource("icon/bank.png")
        );
        Image i2 = i1.getImage().getScaledInstance(
                100, 100, Image.SCALE_DEFAULT
        );
        ImageIcon i3 = new ImageIcon(i2);

        JLabel image = new JLabel(i3);
        image.setBounds(150, 5, 100, 100);
        add(image);

        JLabel l1 = new JLabel("Page 3:");
        l1.setFont(new Font("Raleway", Font.BOLD, 22));
        l1.setBounds(280, 40, 400, 40);
        add(l1);

        JLabel l2 = new JLabel("Account Details");
        l2.setFont(new Font("Raleway", Font.BOLD, 22));
        l2.setBounds(280, 70, 400, 40);
        add(l2);

        // Account Type
        JLabel l3 = new JLabel("Account Type:");
        l3.setFont(new Font("Raleway", Font.BOLD, 18));
        l3.setBounds(100, 140, 200, 30);
        add(l3);

        r1 = new JRadioButton("Saving Account");
        r1.setFont(new Font("Raleway", Font.BOLD, 16));
        r1.setBackground(new Color(216, 237, 240));
        r1.setBounds(100, 180, 180, 30);
        add(r1);

        r2 = new JRadioButton("Fixed Deposit Account");
        r2.setFont(new Font("Raleway", Font.BOLD, 16));
        r2.setBackground(new Color(216, 237, 240));
        r2.setBounds(350, 180, 300, 30);
        add(r2);

        r3 = new JRadioButton("Current Account");
        r3.setFont(new Font("Raleway", Font.BOLD, 16));
        r3.setBackground(new Color(216, 237, 240));
        r3.setBounds(100, 220, 230, 30);
        add(r3);

        r4 = new JRadioButton("Recurring Deposit Account");
        r4.setFont(new Font("Raleway", Font.BOLD, 16));
        r4.setBackground(new Color(216, 237, 240));
        r4.setBounds(350, 220, 280, 30);
        add(r4);

        ButtonGroup buttonGroup = new ButtonGroup();
        buttonGroup.add(r1);
        buttonGroup.add(r2);
        buttonGroup.add(r3);
        buttonGroup.add(r4);

        // Card Number
        JLabel l4 = new JLabel("Card Number:");
        l4.setFont(new Font("Raleway", Font.BOLD, 18));
        l4.setBounds(100, 300, 200, 30);
        add(l4);

        JLabel l5 = new JLabel("(Your 16-digit Card Number)");
        l5.setFont(new Font("Raleway", Font.BOLD, 12));
        l5.setBounds(100, 330, 200, 20);
        add(l5);

        JLabel l6 = new JLabel("XXXX-XXXX-XXXX-XXXX");
        l6.setFont(new Font("Raleway", Font.BOLD, 18));
        l6.setBounds(330, 300, 300, 30);
        add(l6);

        JLabel l7 = new JLabel(
                "(It would appear on ATM card/cheque book and statements)"
        );
        l7.setFont(new Font("Raleway", Font.BOLD, 12));
        l7.setBounds(330, 330, 500, 20);
        add(l7);

        // PIN
        JLabel l8 = new JLabel("PIN:");
        l8.setFont(new Font("Raleway", Font.BOLD, 18));
        l8.setBounds(100, 370, 200, 30);
        add(l8);

        JLabel l9 = new JLabel("XXXX");
        l9.setFont(new Font("Raleway", Font.BOLD, 18));
        l9.setBounds(330, 370, 200, 30);
        add(l9);

        JLabel l10 = new JLabel("(4-digit Password)");
        l10.setFont(new Font("Raleway", Font.BOLD, 12));
        l10.setBounds(100, 400, 200, 20);
        add(l10);

        // Services
        JLabel l11 = new JLabel("Services Required:");
        l11.setFont(new Font("Raleway", Font.BOLD, 18));
        l11.setBounds(100, 450, 200, 30);
        add(l11);

        c1 = new JCheckBox("ATM CARD");
        c1.setBackground(new Color(216, 237, 240));
        c1.setFont(new Font("Raleway", Font.BOLD, 16));
        c1.setBounds(100, 500, 200, 30);
        add(c1);

        c2 = new JCheckBox("Internet Banking");
        c2.setBackground(new Color(216, 237, 240));
        c2.setFont(new Font("Raleway", Font.BOLD, 16));
        c2.setBounds(350, 500, 200, 30);
        add(c2);

        c3 = new JCheckBox("Mobile Banking");
        c3.setBackground(new Color(216, 237, 240));
        c3.setFont(new Font("Raleway", Font.BOLD, 16));
        c3.setBounds(100, 550, 200, 30);
        add(c3);

        c4 = new JCheckBox("EMAIL Alerts");
        c4.setBackground(new Color(216, 237, 240));
        c4.setFont(new Font("Raleway", Font.BOLD, 16));
        c4.setBounds(350, 550, 200, 30);
        add(c4);

        c5 = new JCheckBox("Cheque Book");
        c5.setBackground(new Color(216, 237, 240));
        c5.setFont(new Font("Raleway", Font.BOLD, 16));
        c5.setBounds(100, 600, 200, 30);
        add(c5);

        c6 = new JCheckBox("E-Statement");
        c6.setBackground(new Color(216, 237, 240));
        c6.setFont(new Font("Raleway", Font.BOLD, 16));
        c6.setBounds(350, 600, 200, 30);
        add(c6);

        // Declaration
        c7 = new JCheckBox(
                "I hereby declare that the above entered details are correct.",
                true
        );
        c7.setBackground(new Color(216, 237, 240));
        c7.setFont(new Font("Raleway", Font.BOLD, 12));
        c7.setBounds(100, 680, 600, 20);
        add(c7);

        // Form Number
        JLabel l12 = new JLabel("Form No :");
        l12.setFont(new Font("Raleway", Font.BOLD, 12));
        l12.setBounds(700, 10, 100, 30);
        add(l12);

        JLabel l13 = new JLabel(formno);
        l13.setFont(new Font("Raleway", Font.BOLD, 14));
        l13.setBounds(760, 10, 60, 30);
        add(l13);

        // Submit Button
        s = new JButton("Submit");
        s.setFont(new Font("Raleway", Font.BOLD, 14));
        s.setBackground(Color.BLACK);
        s.setForeground(Color.WHITE);
        s.setBounds(250, 720, 100, 30);
        s.addActionListener(this);
        add(s);

        // Cancel Button
        c = new JButton("Cancel");
        c.setFont(new Font("Raleway", Font.BOLD, 14));
        c.setBackground(Color.BLACK);
        c.setForeground(Color.WHITE);
        c.setBounds(420, 720, 100, 30);
        c.addActionListener(this);
        add(c);

        // Frame
        getContentPane().setBackground(new Color(216, 237, 240));
        setSize(850, 800);
        setLayout(null);
        setLocation(400, 20);
        setVisible(true);
    }

    @Override
    public void actionPerformed(ActionEvent e) {

        // Cancel
        if (e.getSource() == c) {
            System.exit(0);
        }

        // Submit
        if (e.getSource() == s) {

            // Account Type
            String atype = null;

            if (r1.isSelected()) {
                atype = "Saving Account";
            } else if (r2.isSelected()) {
                atype = "Fixed Deposit Account";
            } else if (r3.isSelected()) {
                atype = "Current Account";
            } else if (r4.isSelected()) {
                atype = "Recurring Deposit Account";
            }

            // Validate Account Type
            if (atype == null) {
                JOptionPane.showMessageDialog(
                        null,
                        "Please select an Account Type"
                );
                return;
            }

            // Generate 16-digit Card Number
            Random ran = new Random();

            long cardNumber =
                    1000000000000000L
                    + Math.abs(ran.nextLong()) % 9000000000000000L;

            String cardno = String.valueOf(cardNumber);

            // Generate 4-digit PIN
            int pinNumber = 1000 + ran.nextInt(9000);
            String pin = String.valueOf(pinNumber);

            // Services
            StringBuilder fac = new StringBuilder();

            if (c1.isSelected()) {
                fac.append("ATM CARD ");
            }

            if (c2.isSelected()) {
                fac.append("Internet Banking ");
            }

            if (c3.isSelected()) {
                fac.append("Mobile Banking ");
            }

            if (c4.isSelected()) {
                fac.append("EMAIL Alerts ");
            }

            if (c5.isSelected()) {
                fac.append("Cheque Book ");
            }

            if (c6.isSelected()) {
                fac.append("E-Statement ");
            }

            // Validate Services
            if (fac.length() == 0) {
                JOptionPane.showMessageDialog(
                        null,
                        "Please select at least one service"
                );
                return;
            }

            // Declaration
            if (!c7.isSelected()) {
                JOptionPane.showMessageDialog(
                        null,
                        "Please accept the declaration"
                );
                return;
            }

            try {

                Con con = new Con();

                String q1 =
                        "INSERT INTO signupthree VALUES('" +
                         formno + "','" +
                         atype + "','" +
                         cardno + "','" +
                         pin + "','" +
                         fac.toString().trim() + "')";

                String q2 = "INSERT INTO login (formno, card_number, pin) VALUES ('"
                        + formno + "','" + cardno + "','" + pin + "')";

                con.statement.executeUpdate(q1);
                con.statement.executeUpdate(q2);

                JOptionPane.showMessageDialog(
                        null,
                        "Card Number : " + cardno +
                        "\nPIN : " + pin
                );

                // Check your Deposit constructor.
                // If Deposit requires card number instead of PIN,
                // change this to new Deposit(cardno).
                new Deposit(pin);

                setVisible(false);

            } catch (Exception E) {
                E.printStackTrace();

                JOptionPane.showMessageDialog(
                        null,
                        "Database Error: " + E.getMessage()
                );
            }
        }
    }

    public static void main(String[] args) {
        new Signup3(" ");
    }
}